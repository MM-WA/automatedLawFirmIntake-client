const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const systemPrompt = `You are a legal intake assistant for a law firm. Ask the user questions to collect the following information:

                      - Full Name  
                      - Email  
                      - Phone Number (auto-format phone to +1 (XXX) XXX-XXXX)
                      - City/State  
                      - Case Type (Car Accident, Employment Dispute, Criminal Defense, Immigration Law, Personal Injury, Business Formation & Disputes or something else)
                      - Incident Date  
                      - Brief description of what happened  
                      - Preferred contact time

                      Ask questions one by one in a friendly, professional tone. Confirm answers if unclear.

                      **Once you have collected and confirmed all the information, return ONLY a raw JavaScript object with all propeties in camel case in JSON formate. Do not include any explanations or extra text.**`;

export function afterHourOrWeekend() {
  const now = new Date();
  const time = now.getHours();
  const day = now.getDay();

  if (time >= 17) {
    return "afterHour";
  }

  if (day === 0 || day === 6) {
    return "weekend";
  }
}

export async function sendMessage(
  messages,
  setMessages,
  input,
  setInput,
  setIsLoading,
  setInfoObject
) {
  if (!input.trim()) return;

  const newMessages = [...messages, { role: "user", content: input }];
  setMessages(newMessages);
  setInput("");

  /* use this if you want to show after hour messages */
  // const time = afterHourOrWeekend();
  // if (time === "afterHour" || time === "weekend") {
  //   setMessages((prevState) => [
  //     ...prevState,
  //     {
  //       role: "system",
  //       content:
  //         "We are really sorry! Right now we are close. Our office time is 8am to 5pm from Monday to Friday. Thank you.",
  //     },
  //   ]);

  //   return;
  // }

  setIsLoading(true);

  try {
    const res = await fetch(`${baseUrl}/api/v1/gpt/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        { role: "system", content: systemPrompt },
        ...newMessages,
      ]),
    });

    const data = await res.json();

    if (data?.message) {
      const matches = data.message.match(/{[\s\S]*?}/g);

      if (matches && matches.length > 0) {
        const raw = matches[0]
          .replace(/^.*?{/, "{") // Trim before first `{`
          .replace(/}.*$/, "}"); // Trim after last `}`

        const parsedRes = JSON.parse(raw);
        setInfoObject(parsedRes);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Thank you, ${parsedRes.fullName}! A lawyer will contact you within 24 hours. 
                        Your Case ID: #INGRID-5XH9 | Need urgent help? Call +1 (234) 567-8910.`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      }
    }
  } catch (error) {
    console.error("Chatbot error:", error);
  } finally {
    setIsLoading(false);
  }
}
