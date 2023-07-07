import React, { ChangeEvent, useRef, useState } from "react";
import { IoSendOutline } from 'react-icons/io5';
import { createRipples } from "react-ripples";
import { BiMicrophone } from 'react-icons/bi'
import { ImChrome } from 'react-icons/im';

const RippleButton = createRipples({
  color: "#ffffff0b",
  during: 600,
  className: "rounded-md  h-12"
})

const RecordRippleButton = createRipples({
  color: "#ffffff0b",
  during: 600,
  className: "rounded-full record-btn relative   w-12 h-12"
})

interface Props {
  listening: boolean,
  onStartRecording: Function,
  onStopRecording: Function,
  canRecord: boolean
}



const ChatArea: React.FC<Props> = ({ listening, onStartRecording, onStopRecording, canRecord }) => {
  const messageArea = useRef<HTMLTextAreaElement | any>();
  const [messageValue, setMessageValue] = useState<string>("");

  console.log(canRecord);

  const updateHeight = (e: ChangeEvent | any) => {
    setMessageValue(e.target.value)
    console.log(e.target.value)
    messageArea.current.style.height = "auto";
    messageArea.current.style.height = e.target.scrollHeight + 'px';
  }
  return <div className="w-full border-t pt-2 px-1 border-[#ffffff17] custom-md:border-none items-center gap-3 flex">
    <div className="flex w-[80%] items-center   rounded-md  bg-[#ffffff0b]">
      <textarea
        value={messageValue}
        ref={(element: HTMLTextAreaElement) => messageArea.current = element}
        rows={1}
        onChange={updateHeight}
        placeholder="Tell me something...."
        className="p-4 text-sm overflow-hidden w-full outline-none text-white resize-none h-full bg-transparent"></textarea>
    </div>
    <RippleButton>
      <button type="button" className="border outline-none flex items-center justify-center text-2xl text-[#ffffff89] bg-[#ffffff0b] rounded-md outline border-[#ffffff25]  w-20">
        <IoSendOutline />
      </button>
    </RippleButton>

    <div className={`relative ${!canRecord && "record-btn-container"}`}>
      {!canRecord &&
        <div className="w-[250px] record-tooltip scale-0 px-3 opacity-0 items-center gap-2 top-[-40px] duration-300 rounded-tl-[20px] rounded-bl-[20px] flex rounded-tr-[20px]  absolute right-[20px] h-[50px] bg-white">
          <ImChrome className=" text-[25px]" />
          <p className="text-sm">only for Chrome desktop 😥</p>
        </div>
      }
      <RecordRippleButton>
        <button
          disabled={canRecord === false ? true : false}
          onClick={() => {
            if (listening) {
              onStopRecording();
            } else {
              onStartRecording()
            }
          }} type="button" className="border disabled:opacity-[0.3]  record-btn rounded-full outline-none flex items-center justify-center text-2xl text-[#ffffff89] bg-[#ffffff0b]  outline border-[#ffffff25] w-full h-full  ">
          <BiMicrophone className="absolute duration-200" style={listening ? { transform: "translateY(-50px)" } : { transform: "translateY(0px)" }} />
          <div style={!listening ? { transform: "translateY(50px)" } : { transform: "translateY(0px)" }} className="w-5 h-5 duration-200 absolute record-indicator bg-red-500 rounded-md"></div>
        </button>
      </RecordRippleButton>
    </div>
  </div >
    ;
};

export default ChatArea;
