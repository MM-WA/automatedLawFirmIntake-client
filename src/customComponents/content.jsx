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
        <span className="text-8xl font-semibold text-[#1E3A8A]">IngridAI</span>
        <br />
        <span className="text-6xl font-serif font-normal text-[#1E3A8A]">
          Your 24/7 Legal Intake Assistant!
        </span>
      </div>

      <p className="text-black w-[40%] mt-8 text-lg">
        IngridAI simplifies the process of seeking legal assistance. Whether
        you're dealing with personal injury, family law, employment disputes, or
        other legal matters, our AI-powered assistant guides you through a few
        quick questions to ensure your case reaches the right lawyer swiftly and
        securely.
      </p>
      <ul className="mt-5 list-disc text-lg text-black">
        <li>24/7 Availability: Get started now, no waiting for business hours.</li>
        <li>Secure & Confidential: Your data is encrypted end-to-end and GDPR/CIPP-US compliant.</li>
        <li>Effortless Process: Answer simple questions, and we'll handle the rest.</li>
        <li>Expert Matching: Your details are sent directly to vetted legal professionals.</li>
      </ul>

      <p className="mt-5 text-xl text-[#1E3A8A]">Ready to begin? Click 'Start Now' below. Help is just a few steps away.</p>

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
