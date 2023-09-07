import "regenerator-runtime/runtime";
import ChatArea from "../../components/forms/ChatArea";
import { useSpeechContext } from '@speechly/react-client';
import feather from '../../assets/feather.png';
import ResponseMessage from "../../components/response-message/response-message";
import { createRipples } from "react-ripples";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRecoilState } from "recoil";
import chatsAtom from "../../../recoil/atoms/chats";
import { useParams } from "react-router";
import axios from "axios";
import { useLocalStorage } from "../../hooks/localStorage";
import { useNavigate } from "react-router";

;

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
  const [updateChatsPending, updateChats] = useTransition();
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
  };




  useEffect(() => {
    extractMessagesList();
  }, []);

  const createMessage = async () => {
    setMessageRequestLoading(true);
    try {
      const request = await axios.post('http://localhost:3000/conversation/message', {
        chatId: params.id,
        prompt: message
      },
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + getItem("auth").token,
          }
        });

      setMessageRequestLoading(false);
      console.log(request.data);
      renderCreatedMessage(request.data);
      
    } catch (error) {
      console.log(error);
      setMessageRequestLoading(false);
    }
  };

  const scrollToEnd = () => {
    const container = messagesContainer.current;
    const scrollTimer = setTimeout(() => {
      container?.scroll({ top: container.scrollHeight , });
      clearTimeout(scrollTimer);
    }, 0)

  };

  const scrollToLatestChat = () => {
    const lastChat = messagesContainer.current?.lastElementChild;
    lastChat?.scrollIntoView({ behavior: "smooth" });
  }

  const renderCreatedMessage = (message: any) => {
    console.log(message);
    const previousMessages = [...selectedChats!];
    previousMessages.push(message);
    setSelectedChats([...previousMessages]);
    scrollToLatestChat();

    updateChats(() => {
      const previousChatsState = [...chats];
      const selectedChatIndex = chats.findIndex((chat) => chat.id === params.id);
      const selectedChatPreviousMessage = previousChatsState[selectedChatIndex];
      selectedChatPreviousMessage.messages.push(message);
    });
  }

  const inputUpdate = (e: string) => {
    setMessage(e);
  }


  return <>
    <div ref={(el: HTMLDivElement) => messagesContainer.current = el} style={false ? { background: "#0006" } : {}} className="sideMenu-container rounded-bl-lg px-2 pt-20 relative z-30 overflow-auto h-screen  flex flex-col   w-full  text-white ">
      {selectedChats!?.length > 0 && (selectedChats?.map((message, index) => (<ResponseMessage
        index={index}
        length={selectedChats.length}
        scrollToTheEnd={() => scrollToEnd()}
        loaded={message.loaded}
        result={message.result}
        prompt={message.prompt} />
      )))}
      {selectedChats!?.length <= 0 && <NoMessage />}
    </div>



    <ChatArea
      onchange={inputUpdate}
      sendMessage={createMessage}
      sendingLoading={messageRequestLoading}
      canRecord={true}
      onStopRecording={() => stop()}
      onStartRecording={() => { }}
      listening={false} />
  </>
    ;
};

export default ChatDetail;
