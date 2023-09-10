import "regenerator-runtime/runtime";
import ChatArea from "../../components/forms/ChatArea";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRecoilState } from "recoil";
import chatsAtom from "../../../recoil/atoms/chats";
import { useParams } from "react-router";
import axios from "axios";
import { useLocalStorage } from "../../hooks/localStorage";
import { useNavigate } from "react-router";
import MessagesList from "../../components/MessagesList/MessagesList";

const ChatDetail = () => {
  const messagesContainer = useRef<HTMLDivElement>();
  const [chats, setChats] = useRecoilState(chatsAtom);
  const params = useParams();
  const [selectedChats, setSelectedChats] = useState<any[]>();
  const messageInput = useRef<string>();
  const [messageRequestLoading, setMessageRequestLoading] = useState<boolean>(false);
  const [updateChatsPending, updateChats] = useTransition();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();


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
        prompt: messageInput.current
      },
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + getItem("auth").token,
          }
        });

      setMessageRequestLoading(false);
      renderCreatedMessage(request.data);

    } catch (error) {
      setMessageRequestLoading(false);
    }
  };

  const scrollToEnd = () => {
    const container = messagesContainer.current;
    const scrollTimer = setTimeout(() => {
      container?.scroll({ top: container.scrollHeight, behavior: "smooth" });
      clearTimeout(scrollTimer);
    }, 0)

  };

  const scrollToLatestChat = () => {
    const lastChat = document.getElementById(`${selectedChats![selectedChats?.length! - 1].id}`);
    lastChat?.scrollIntoView({ behavior: "smooth" });
  }

  const renderCreatedMessage = (message: any) => {
    const previousMessages = [...selectedChats!];
    previousMessages.push(message);
    setSelectedChats([...previousMessages]);

    try {
      updateChats(() => {
        const previousChatsState = [...chats];
        const selectedChatIndex = chats.findIndex((chat) => chat.id === params.id);
        const selectedChatClone = { ...previousChatsState[selectedChatIndex], messages: [...previousChatsState[selectedChatIndex].messages] };

        selectedChatClone.messages.push(message);
        previousChatsState[selectedChatIndex] = { ...selectedChatClone };

        setChats([...previousChatsState]);
        scrollToLatestChat();
      });
    } catch (error) {
      console.log(error)
    }

  }

  const inputUpdate = (e: string) => {
    messageInput.current = e;
  }


  return <>
    <div ref={(el: HTMLDivElement) => messagesContainer.current = el} style={false ? { background: "#0006" } : {}} className="sideMenu-container m-auto rounded-bl-lg px-2 pt-20 relative z-30 overflow-auto h-screen  flex flex-col   w-full max-w-[1200px]   text-white ">
      <MessagesList selectedChats={selectedChats} scrollToEnd={scrollToEnd} />
    </div>

    {updateChatsPending && <p>loading...</p>}

    <ChatArea
      renderCreatedMessage={renderCreatedMessage}
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
