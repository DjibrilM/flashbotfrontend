import "regenerator-runtime/runtime";
import ChatArea from "../../components/forms/ChatArea";
import { useSpeechContext } from '@speechly/react-client';
import feather from '../../assets/feather.png';
import ResponseMessage from "../../components/response-message/response-message";
import { createRipples } from "react-ripples";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import chatsAtom from "../../../recoil/atoms/chats";
import { useParams } from "react-router";
import axios from "axios";
import { useLocalStorage } from "../../hooks/localStorage";
import { useNavigate } from "react-router";

const RippleButton = createRipples({
  color: "#ffffff0b",
  during: 600,
  className: "rounded-md "
});

const NoMessage = () => {
  return <div className="flex flex-col items-center justify-center pb-32 w-full h-full ">
    <div className=" relative custom-md:right-40 flex items-center flex-col ">
      <img className="w-40 sm:w-52" src={feather} />
      <h1 className=" mt-3 text-slate-300">Type Your First Message</h1>
    </div>
  </div>
}

const ChatDetail = () => {
  const messagesContainer = useRef<HTMLDivElement>();
  const [chats, setChats] = useRecoilState(chatsAtom);
  const params = useParams();
  const [selectedChats, setSelectedChats] = useState<any[]>();
  const [message, setMessage] = useState<string>();
  const [messageRequestLoading, setMessageRequestLoading] = useState<boolean>(false);
  const { getItem } = useLocalStorage();
  const navigate = useNavigate()
 

  const extractMessagesList = () => {
    const index = chats.findIndex((el) => el.id === params.id);
    if (index >= 0) {
      const findChats: any[] = chats[index].messages;
      setSelectedChats([...findChats]);
    } else {
      navigate("404");
    }
   
  }


  useEffect(() => {
    const lastElement = messagesContainer.current
    lastElement?.scroll({ top: lastElement.scrollHeight });
    extractMessagesList();
  }, []);

  const createMessage = () => {
    setMessageRequestLoading(true);
    try {
      axios.post('http://localhost:3000/conversation/message', {
        prompt: message,
        chatId: params.id,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + getItem("auth").token,
        },
      });
    } catch (error) {
      setMessageRequestLoading(false);
    }
  };

  const inputUpdate = (e:string) => {
    setMessage(e);
  }


  return <>
    <div ref={(el: HTMLDivElement) => messagesContainer.current = el} style={false ? { background: "#0006" } : {}} className="sideMenu-container rounded-bl-lg px-2 pt-20 relative z-30 overflow-auto h-screen  flex flex-col  w-full  text-white ">
      {selectedChats!?.length > 0 && (<ResponseMessage />)}
      {selectedChats!?.length <= 0 && <NoMessage />}
    </div>

    <ChatArea
      onchange={inputUpdate}
      sendMessage={createMessage}
      sendingLoading={messageRequestLoading}
      canRecord={true}
      onStopRecording={() => stop()}
      onStartRecording={() => { }} listening={false} />
  </>
    ;
};

export default ChatDetail;
