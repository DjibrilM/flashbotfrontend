import { useState, useEffect } from "react";
import ChatItem from "../chatItem/ChatItem";
import { BsChatLeftDots } from "react-icons/bs";
import { IoMdClose } from 'react-icons/io'
import { createRipples } from "react-ripples";
import chatsAtom from "../../../recoil/atoms/chats";
import { useRecoilValue } from "recoil";
import { useFetchState } from "../../hooks/useFetchChats";
import { useCreateChat } from "../../hooks/useCreateChat";
import uiAtom from "../../../recoil/atoms/sideNavigation";
import { fetchChatErrorMessage } from "../../constants";
import { BsEmojiFrown } from 'react-icons/bs';
import { TbMessage2Cog } from 'react-icons/tb';
import ErrorPopup from "../popup/ErrorPopup";


const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-[100%]  rounded-md "
});

interface Props {
    IsOpen: boolean,
    onClose: Function
}

const MobileSideMenu: React.FC<Props> = ({ IsOpen, onClose }) => {
    const chatState = useRecoilValue(chatsAtom);
    const [errorMeesage, setErrorMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const sideMenuUiState = useRecoilValue(uiAtom);
    const { fetchLoading, fetchChats } = useFetchState();
    const { createChatLoading, createChat } = useCreateChat();


    const fetchChatsFn = () => {
        setErrorMessage("");
        setError(false);

        fetchChats().catch((error: any) => {
            setErrorMessage(error.message);
            setError(true);
        })
    };

    useEffect(() => {
        if (sideMenuUiState.itemCount - chatState.length > 0 || sideMenuUiState.itemCount === 0) {
            fetchChatsFn();
        }

    }, []);

    const createChatFn = async () => {
        createChat().catch((error: any) => {
            setError(true);
            setErrorMessage(error.message);
        });

    }

    const onScroll = (scrollableDiv: any) => {
        if (fetchLoading || createChatLoading) return;

        const scrollPosition = scrollableDiv.target.scrollTop;
        const scrollHeight = scrollableDiv.target.scrollHeight;
        const clientHeight = scrollableDiv.target.clientHeight;

        if (scrollPosition + clientHeight + 2 >= scrollHeight && sideMenuUiState.itemCount - chatState.length > 0) {
            fetchChats()
        }
    };

    return <>
        <div style={!IsOpen ? { width: "0px" } : {}} onClick={() => onClose()} className="w-full custom-md:hidden   h-screen fixed z-40 top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-[#0000007f]"></div>
        <nav style={IsOpen ? { left: "0px" } : { left: "-400px" }} className="fixed z-40 duration-500 custom-md:hidden   w-full max-w-[350px] h-screen bg-[#1b263a] left-0 top-0 bottom-0 ">
            <div className="w-full bg-[#ffffff19] border-b h-16 p-4 flex justify-between border-[#ffffff1b]">
                <div className="flex gap-4 items-center">
                    <BsChatLeftDots className="text-white text-[20px]" />
                    <h1 className=" font-bold text-[18px] text-white ">Your chats</h1>
                </div>

                <div onClick={() => onClose()} className="w-7 cursor-pointer  h-7 flex items-center justify-center rounded-md border-[#ffffff26] border">
                    <IoMdClose className="text-white" />
                </div>
            </div>

            <div onScroll={onScroll} style={{ height: "calc(100% - 160px)" }} className="w-full sideMenu-container inline-block mt-2 gap-3 overflow-auto  p-2 ">

                <>
                    {errorMeesage.length < 1 &&
                        chatState.map((chatElement, index) => {
                            return <ChatItem
                                key={index}
                                id={chatElement.id}
                                date={chatElement.createdAd}
                                messages={chatElement.messages} />
                        })
                    }
                </>

                {errorMeesage === fetchChatErrorMessage && <div className="w-full mt-10 flex-col  flex justify-center">
                    <div className=" w-full flex justify-center mb-4">
                        <BsEmojiFrown className=" text-center text-2xl text-slate-50" />
                    </div>
                    <p className=" text-slate-100 text-sm text-center">Failed to load your chat! Please try again</p>
                    <button onClick={() => fetchChatsFn()} className=" mt-10 w-24 text-slate-100 m-auto p-2 rounded-md  bg-slate-700 active:bg-slate-600">
                        Try Again
                    </button>
                </div>
                }

                {!errorMeesage && !error && chatState.length < 1 && !fetchLoading && <div className=" w-full flex flex-col text-center justify-center mt-10 text-slate-200">
                    <h1 className="">No chat yet </h1>
                    <div className="w-full flex items-center justify-center">
                        <TbMessage2Cog className="text-3xl mt-4" />
                    </div>
                </div>
                }

            </div>
            <div className="w-full p-2 flex  justify-center">
                <RippleButton >
                    <div className="bg-[#ffffff0b] max-w-[350px] w-full rounded-md overflow-hidden">
                        <button onClick={() => createChatFn()} className="w-full h-16 font-bold text-white  active:shadow-lg  bg-[##ffffff19]">
                            Create Chat
                        </button>
                    </div>
                </RippleButton>
            </div>
        </nav>

                {/* error popup */}
                <ErrorPopup
                    errorMessage={errorMeesage}
                    open={error}
                    close={() => setError(false)} />

    </>
        ;
};

export default MobileSideMenu;
