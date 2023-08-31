import "regenerator-runtime/runtime";
import ChatArea from "../../components/forms/ChatArea";
import { useSpeechContext } from '@speechly/react-client';
import ResponseMessage from "../../components/response-message/response-message";
import { createRipples } from "react-ripples";
import { useEffect, useRef, useState } from "react";
const RippleButton = createRipples({
  color: "#ffffff0b",
  during: 600,
  className: "rounded-md "
});

const ChatDetail = () => {
  const { segment, listening, attachMicrophone, start, stop } = useSpeechContext();
  const [tentative, setTentative] = useState<string[]>([]);
  const [finalTranscript, setFinalTranscript] = useState<string>("");
  const messagesContainer = useRef<HTMLDivElement>();


  const handleClick = async () => {
    if (listening) {
      await stop();
    } else {
      await attachMicrophone();
      await start();
    }
  };

  useEffect(() => {
    const lastElement = messagesContainer.current
    lastElement?.scroll({top:lastElement.scrollHeight});
  }, [])

  return <>
    <div ref={(el:HTMLDivElement)=> messagesContainer.current = el} style={listening ? { background: "#0006" } : {}} className="sideMenu-container rounded-bl-lg px-2 pt-20 relative z-30 overflow-auto  flex flex-col  w-full  text-white ">
      <ResponseMessage />
      <ResponseMessage />
      <ResponseMessage />
      <ResponseMessage />
    </div>

    <ChatArea
      canRecord={true}
      onStopRecording={() => stop()}
      onStartRecording={() => handleClick()} listening={listening} />
  </>
    ;
};

export default ChatDetail;
