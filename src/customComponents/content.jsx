import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdGrain } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import ChatBotIndex from "./chatBot/chatBotIndex";
function Content() {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="relative top-40 pl-20">
      <div>
        <span className="text-8xl font-semibold text-[#1E3A8A]">LegalAI</span>
        <br />
        <span className="text-6xl font-serif font-normal text-[#1E3A8A]">
          Always Here to Help You!
        </span>
      </div>

      <p className="text-black w-[40%] mt-8 text-lg">
        I handle client intake on law firm
        websites:
      </p>
      <ul className="mt-3 list-disc text-lg text-black">
        <li>Responds immediately, 24/7</li>
        <li>Asks tailored questions for your practice areas</li>
        <li>Collects documents confidentially</li>
        <li>Fills out your intake forms</li>
        <li>Delivers complete intake packages to your inbox</li>
      </ul>

      <Button className="bg-[#1E3A8A] text-white mt-10 mb-15 p-7 hover:cursor-pointer hover:bg-[#2C4DB0]">
        Start Now <FaArrowRight />
      </Button>

      <div className="fixed left-[90vw] bottom-[5%]">
        <Button
          size="icon"
          className="h-15 w-15 hover:cursor-pointer hover:bg-[#2C4DB0] bg-[#1E3A8A]"
          onClick={() => setShowChat((prevState) => !prevState)}
        >
          <MdGrain className="scale-150" />
        </Button>
      </div>

      {showChat && <ChatBotIndex />}
    </div>
  );
}

export default Content;
