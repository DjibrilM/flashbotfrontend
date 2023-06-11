import ChatArea from "../../components/forms/ChatArea";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



const ChatDetail = () => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  return <>
    <div className=" h-full rounded-lg p-5 w-full bg-[#ffffff0b] text-white ">
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <br />
      <button onClick={() => resetTranscript()}>Reset</button>
      <p>{transcript}</p>
    </div>
    <ChatArea
      onStopRecording={() => {
        SpeechRecognition.stopListening()
      }}
      onStartRecording={() => {
        SpeechRecognition.startListening({
          continuous: true,
          language: 'fr-FR'
        })
      }} listening={listening} />
  </>
    ;
};

export default ChatDetail;
