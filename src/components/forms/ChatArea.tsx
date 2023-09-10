import React, { ChangeEvent, useRef, useState } from "react";
import { createRipples } from "react-ripples";
import { BiMicrophone } from 'react-icons/bi'
import { ImChrome } from 'react-icons/im';
import { RotatingLines } from 'react-loader-spinner';
import { VscSend } from 'react-icons/vsc';
import axios from "axios";
import { useLocalStorage } from "../../hooks/localStorage";
import { useParams } from "react-router";

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
  canRecord: boolean,
  sendingLoading: boolean,
  sendMessage: Function,
  onchange: (e: string) => void,
  renderCreatedMessage: (message:any) => void
}

const ChatArea: React.FC<Props> = ({ listening, onStartRecording, onStopRecording, canRecord, sendingLoading, sendMessage, onchange, renderCreatedMessage }) => {
  const messageArea = useRef<HTMLTextAreaElement | any>();
  const [messageValue, setMessageValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { getItem } = useLocalStorage();
  const params = useParams();

  const updateHeight = (e: ChangeEvent | any) => {
    setMessageValue(e.target.value)
    messageArea.current.style.height = "auto";
    messageArea.current.style.height = e.target.scrollHeight + 'px';
    onchange(e.target.value);
  }

  const createMessage = async () => {
    setLoading(true);

    try {
      const request = await axios.post('http://localhost:3000/conversation/message', {
        chatId: params.id,
        prompt: messageValue
      },
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + getItem("auth").token,
          }
        });

      setLoading(false);
      renderCreatedMessage(request.data);

    } catch (error) {
      setLoading(false);
    }
  };





  return <div className="max-w-[1200px] m-auto w-full border-t pt-2 sm:bg-transparent    px-1 border-[#ffffff17] custom-md:border-none items-center gap-3 flex">
    <div className="flex w-[80%] pr-[5px] p-1 items-center   rounded-md  bg-[#ffffff0b]">
      <textarea
        value={messageValue}
        ref={(element: HTMLTextAreaElement) => messageArea.current = element}
        rows={1}
        onChange={updateHeight}
        placeholder="Tell me something...."
        className="p-4 text-sm  overflow-hidden w-full outline-none text-white resize-none h-full bg-transparent"></textarea>

      <RippleButton>
        <button
          disabled={messageValue.trim().length > 5 ? false : true}
          onClick={() => createMessage()}
          type="button"
          className="border outline-none flex items-center justify-center text-[24px] text-[#ffffff89] bg-[#ffffff0b] disabled:cursor-not-allowed disabled:opacity-[0.3]  rounded-md outline border-[#ffffff25]  w-16">
          {!loading ? <VscSend /> : <RotatingLines strokeColor="#ccc" width="18" />}
        </button>
      </RippleButton>
    </div>

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
