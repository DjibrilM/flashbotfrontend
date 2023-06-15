import { useEffect, useState } from 'react';
import imageLogo from '../../assets/chatbot.png'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { BiCode } from 'react-icons/bi';

const ResponseMessage = () => {
    const messageState = "On Wikipedia and other sites running on MediaWiki, Special:Random can be used to access a random article in the main namespace; this feature is useful as a tool to generate a random article. Depending on your browser, it's also possible to load a random page using a keyboard shortcut (in Firefox,";
    const [animatedMessage, setAnimatedMessage] = useState<string>("");
    const [character, setCharacter] = useState<string>("");
    const [isTyping, stopTyping] = useState<boolean>(true);
    const code: string = localStorage.getItem("code") || "";

    useEffect(() => {
        setAnimatedMessage(animatedMessage + character);
    }, [character]);

    useEffect(() => {
        setAnimatedMessage("");
        setCharacter("");
        const messageArray = messageState.split("");
        let characterIndex: number = 0;
        const animationInterval = setInterval(() => {
            if (characterIndex >= messageArray.length) {
                clearInterval(animationInterval);
                stopTyping(false);
            } else {
                setCharacter(messageArray[characterIndex])
                characterIndex++;
            }
        }, 50);

    }, []);



    return <>
        <div className="mb-10">
            <div className="flex gap-3   rounded-md ">
                <div className="p-5 h-[3.5rem] border-2 border-[#ffffff27] flex items-center justify-center rounded-full bg-black ">
                    <h1>D</h1>
                </div>

                <div className="bg-[#0006] p-4 rounded-md ">
                    <p className="text-sm">
                        Lorem ipsum dolor sit.
                    </p>
                </div>
            </div>

            <div className="mt-4 gap-4  bg-[#0006] p-2 max-w-[700px] w-full    rounded-md ">
                <div className="w-[3rem] h-[3rem] border-2 border-[#ffffff27] flex items-center justify-center rounded-full bg-black ">
                    <img src={imageLogo} className='w-5' alt="" />
                </div>
                <p className='p-2 text-sm leading-5'>{animatedMessage}  <strong style={isTyping ? { opacity: "1" } : { opacity: "0" }} className='typeIndicator'>|</strong></p>
                {/* <div className="rounded-md mt-7 overflow-hidden">
                    <div className="h-10 flex bg-gray-500 relative top-1 z-20 rounded-t-md  justify-between items-center w-full">
                        <div className="flex items-center ml-2">
                            <p className='text-sm p-2'>Javascript</p>
                            <BiCode />
                        </div>

                        <div className=" mr-6 flex gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-200"></div>
                            <div className="w-2 h-2 rounded-full bg-red-200"></div>
                            <div className="w-2 h-2 rounded-full bg-green-200"></div>
                        </div>
                    </div>
                    <MarkdownPreview source={code} />
                </div> */}

            </div>
        </div>
        <div>

        </div>
    </>;
};

export default ResponseMessage;
