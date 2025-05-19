import { useEffect, useState } from "react";
import { afterHourOrWeekend } from "./utils";

function ChatBotIndex() {
  const systemPrompt = `You are a legal intake assistant for a law firm. Ask the user questions to collect the following information:

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

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm IngridAI's virtual assistant. Let's get started. What's your name?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [infoObject, setInfoObject] = useState(null);

  useEffect(() => {
    async function sendMail() {
      console.log(infoObject)
      try {
        if (infoObject) {
          const res = await fetch("http://localhost:8000/api/v1/gpt/sendMail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(infoObject),
          });
          const parsedRes = res.json();
        }
      } catch (error) {
        console.log(error);
      }
    }
    sendMail();
  }, [infoObject]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

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
      const res = await fetch("http://localhost:8000/api/v1/gpt/chat", {
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
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="absolute bottom-10 right-10 bg-white text-black rounded-lg shadow-xl w-[300px] h-[400px] p-4 z-50">
      <h3 className="text-xl font-semibold mb-2">Chat with us</h3>

      <div className="h-[300px] overflow-y-auto border rounded p-2 mb-2">
        <div className="flex-1 overflow-y-auto border rounded p-2 space-y-2 mb-2 text-sm">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                msg.role === "user"
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-100 self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {isLoading && <div className="text-gray-500">Typing...</div>}
        </div>
      </div>

      <input
        type="text"
        placeholder="Type your message..."
        className="w-full border rounded px-2 py-1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default ChatBotIndex;
