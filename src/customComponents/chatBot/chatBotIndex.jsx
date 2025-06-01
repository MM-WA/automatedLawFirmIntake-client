const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
import { useEffect, useState } from "react";
import { sendMessage } from "./utils";

const ChatBotIndex = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm LegalAI virtual assistant. Let's get started. What's your name?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [infoObject, setInfoObject] = useState(null);

  useEffect(() => {
    async function sendMail() {
      try {
        if (infoObject) {
          const res = await fetch(`${baseUrl}/api/v1/gpt/sendMail`, {
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(
        messages,
        setMessages,
        input,
        setInput,
        setIsLoading,
        setInfoObject
      );
    }
  };

  return (
    <div className="absolute bottom-25 lg:bottom-5 right-10 bg-[#1E3A8A] text-black rounded-lg shadow-xl w-[300px] h-[400px] p-4 z-50">
      <h3 className="text-xl font-semibold mb-2 text-white">Chat with us</h3>

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
        className="w-full border rounded px-2 py-1 bg-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default ChatBotIndex;
