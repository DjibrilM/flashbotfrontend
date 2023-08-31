import { BsChatLeftDots } from "react-icons/bs";
import ChatItem from "../chatItem/ChatItem";
import { BiLogOut } from 'react-icons/bi';
import { createRipples } from 'react-ripples'
import React, { useEffect, useState } from "react";
import Switch from "../switch/Switch";
import AlertPopUp from "../popup/AlertPopUp";
import { useRecoilState, useRecoilValue } from "recoil";
import { authenticationAtom } from "../../../recoil/atoms/authentication";
import { useLocalStorage } from "../../hooks/localStorage";
import { useNavigate } from "react-router";
import chatsAtom from '../../../recoil/atoms/chats';
import { RotatingLines } from "react-loader-spinner";
import ErrorPopup from "../popup/ErrorPopup";
import { useFetchState } from "../../hooks/useFetchChats";
import { useCreateChat } from "../../hooks/useCreateChat";
import uiState from '../../../recoil/atoms/sideNavigation';
import { BsEmojiFrown } from 'react-icons/bs';
import { fetchChatErrorMessage } from "../../constants";
import { TbMessage2Cog } from 'react-icons/tb';

const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-full rounded-md "
})

interface Props {
    isOpen: boolean
}

const SideNavigation: React.FC<Props> = ({ isOpen }) => {
    const [alertPopupDescription, setAlertPopupDescription] = useState<string>("");
    const [openAlertPopup, setOpenAlertPopup] = useState<boolean>(false);
    const [AlertPopupLoading, _] = useState<boolean>(false);
    const [alertPopupTitle, setAlertPopupTitle] = useState<string>("");
    const [__, setAuthorizationData] = useRecoilState(authenticationAtom);
    const { clearItem } = useLocalStorage()
    const navigate = useNavigate();
    const chatState = useRecoilValue(chatsAtom);
    const [errorMeesage, setErrorMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const sideMenuUiState = useRecoilValue(uiState);
    const { fetchLoading, fetchChats } = useFetchState();
    const { createChatLoading, createChat } = useCreateChat();

    const logout = () => {
        setAuthorizationData({
            isLoggedIn: false,
            userProfileImage: "",
            email: ""
        });

        clearItem("auth");
        navigate({ pathname: "/login" });
    }


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

    return <aside style={isOpen ? { maxWidth: "350px" } : { maxWidth: "0px", }} className={`${!isOpen ? "overflow-hidden" : "flex"}   justify-between  flex-col custom-md:block hidden h-[calc(100vh-90px)] mt-20 relative    duration-300  w-full`}>
        <nav className="w-full relative   h-[400px] overflow-hidden  bg-[#ffffff0b] rounded-md  ">

            <div className="w-full gap-2 text-white items-center flex pl-5 h-14 border-b bg-[#ffffff19] border-[#ffffff19]">
                <BsChatLeftDots />
                <h1 className="text-[18px] font-bold">Your Chats</h1>
            </div>

            <div className="w-full pr-1 mt-1  ">
                <div onScroll={onScroll} className="w-full pb-12 overflow-auto sideMenu-container pr-2 pl-2 pt-3 h-[340px]">

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

                    {fetchLoading && (
                        <div className="w-full pt-5  pb-4 flex items-center justify-center">
                            <RotatingLines width="20" strokeColor="#ffff" />
                        </div>
                    )}

                </div>
            </div>

            <div className="h-5 absolute bottom-0  w-full bg-slate-800 border-t border-[#ffffff0a]">
            </div>
        </nav>

        <div className="mt-10  ">
            <ul className="">
                <li className="flex  relative bottom-6 w-full  text-gray-200 gap-8 pb-3  border-b border-[#ffffff0b]  items-center font-bold">
                    <span className="text-sm">Voice Reader</span>
                    <Switch />
                </li>

                {/* alert popup */}
                <AlertPopUp
                    close={() => setOpenAlertPopup(false)}
                    open={openAlertPopup}
                    action={logout}
                    title={alertPopupTitle}
                    description={alertPopupDescription}
                    Loading={AlertPopupLoading} />

                {/* error popup */}
                <ErrorPopup
                    errorMessage={errorMeesage}
                    open={error}
                    close={() => setError(false)} />

                <button
                    onClick={() => {
                        setOpenAlertPopup(true);
                        setAlertPopupTitle("Are you sure ?")
                        setAlertPopupDescription("You will be logged mt-4 out from the application, do you really want to continue 🤔")
                    }}>
                    <li className="flex text-gray-200 mt-2 cursor-pointer  gap-4 items-center font-bold">
                        <BiLogOut className="text-2xl" />
                        <span>Logout</span>
                    </li>
                </button>
            </ul>
        </div>

        <div style={{ maxWidth: "350px" }} className=" absolute bottom-0 w-full">
            <RippleButton >
                <div className="bg-[#ffffff0b] max-w-[350px] w-full rounded-md overflow-hidden">
                    <button onClick={() => createChatFn()} className="w-full h-14 flex items-center justify-center font-bold text-white  active:shadow-lg  bg-[##ffffff19]">
                        {createChatLoading ? <RotatingLines width="20" strokeColor="#ffff" /> : <span>Create Chat</span>}
                    </button>
                </div>
            </RippleButton>
        </div>
    </aside>;
};

export default SideNavigation;
