
import ChatArea from "../../components/forms/ChatArea";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ResponseMessage from "../../components/response-message/response-message";
import { createRipples } from "react-ripples";
const RippleButton = createRipples({
  color: "#ffffff0b",
  during: 600,
  className: "rounded-md "
})



const ChatDetail = () => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();


  const createSpeech = async () => {
    try {
      let utterance = new SpeechSynthesisUtterance(transcript);
      const voice: any[] = await window.speechSynthesis.getVoices();
      utterance.voice = voice[3];
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.log(error)
    }
  };


  return <>
    <div style={listening ? { background: "#0006" } : {}} className=" h-full sideMenu-container overflow-auto relative rounded-lg flex flex-col p-5 w-full  text-white ">
      {listening ?
        <>
          <div className="h-full w-full">
            <p className="text-gray-200">{transcript}</p>
          </div>
          <div className=" w-full pt-2 justify-between   border-[#ffffff1d] flex items-center  border-t">
            <RippleButton>
              <button onClick={() => resetTranscript()} className="px-20 rounded-md text-sm bg-[#ffffff0b] py-3">
                Reset
              </button>
            </RippleButton>

            <p>{transcript.split('').length} / 100</p>
          </div>
        </> : <>
          <ResponseMessage />
          <ResponseMessage />
        </>}
    </div>
    {/* <div style={{ background: "linear-gradient(transparent,#131d2f,#131d2f)" }} className="w-full h-16  relative bottom-10"></div> */}
    <ChatArea
      canRecord={browserSupportsSpeechRecognition}
      onStopRecording={() => {
        SpeechRecognition.stopListening();
        createSpeech();
        resetTranscript();
      }}
      onStartRecording={() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: 'en-US',
        })
      }} listening={listening} />
  </>
    ;
};

export default ChatDetail;
