import { BsChatLeftDots } from "react-icons/bs";
import ChatItem from "../chatItem/ChatItem";
import { BiLogOut } from 'react-icons/bi';
import { createRipples } from 'react-ripples'
import React, { useState } from "react";
import Switch from "../switch/Switch";
import AlertPopUp from "../popup/AlertPopUp";
import { useRecoilState } from "recoil";
import { authenticationAtom } from "../../../recoil/atoms/authentication";
import { useLocalStorage } from "../../hooks/localStorage";
import { useNavigate, useParams } from "react-router";
import chatsAtom from '../../../recoil/atoms/chats';
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { Chat as ChatType } from "../../../recoil/atoms/chats";
import { formatDate } from "../../helpers/date";
import ErrorPopup from "../popup/ErrorPopup";

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
    const { clearItem, getItem } = useLocalStorage()
    const navigate = useNavigate();
    const [chatState, setChatState] = useRecoilState(chatsAtom);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMeesage, setErrorMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const navParams = useParams()

    const logout = () => {
        setAuthorizationData({
            isLoggedIn: false,
            userProfileImage: "",
        });

        clearItem("auth");
        navigate({ pathname: "/login" });
    }

    const createChat = async () => {
        setLoading(true);
        try {
            const request = await axios.post("http://localhost:3000/conversation/chat",
                {

                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: "Bearer " + getItem("auth").token,
                    }
                })

            const newChat: ChatType = {
                id: request.data._id,
                createdAd: formatDate(request.data.createdAt),
                messages: []
            };

            const previousChats: ChatType[] = [...chatState];
            previousChats.unshift(newChat);
            setChatState([...previousChats]);
            setLoading(false);
            navigate("conversation/" + request.data._id,)

        } catch (error) {
            setLoading(false)
        }
    };

    // const loadUserChats = async () => {
    //     const request = await axios.get("http://localhost:3000/conversation/chat", { headers: {} })
    //     setChatState([...request.data]);
    // }

    return <aside style={isOpen ? { maxWidth: "350px" } : { maxWidth: "0px", }} className={`${!isOpen ? "overflow-hidden" : "flex"}  justify-between  flex-col custom-md:block hidden h-[calc(100vh-90px)] relative   duration-300  w-full`}>

        <nav className="w-full  h-[400px] overflow-hidden  bg-[#ffffff0b] rounded-md  ">

            <div className="w-full gap-2 text-white items-center flex pl-5 h-14 border-b bg-[#ffffff19] border-[#ffffff19]">
                <BsChatLeftDots />
                <h1 className="text-[18px] font-bold">Your Chats</h1>
            </div>

            <div className="w-full pr-1 mt-1">
                <div className="w-full overflow-auto sideMenu-container pr-1 pl-2 pt-3 h-[340px]">

                    {
                        chatState.map(chatElement => {
                            return <ChatItem
                                isActive={navParams.id === chatElement.id}
                                key={chatElement.id}
                                id={chatElement.id}
                                date={chatElement.createdAd}
                                messages={chatElement.messages} />
                        })
                    }

                </div>
            </div>
        </nav>

        <div className="mt-10">
            <ul>
                <li className="flex mt-6 w-full  text-gray-200 gap-8  pb-4 border-b border-[#ffffff0b]  items-center font-bold">
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
                        setAlertPopupDescription("You will be logged out from the application, do you really want to continue 🤔")
                    }}>
                    <li className="flex text-gray-200 mt-4 cursor-pointer  gap-4 items-center font-bold">
                        <BiLogOut className="text-2xl" />
                        <span>Logout</span>
                    </li>
                </button>
            </ul>
        </div>

        <div style={{ maxWidth: "350px" }} className=" absolute bottom-0 w-full">
            <RippleButton >
                <div className="bg-[#ffffff0b] max-w-[350px] w-full rounded-md overflow-hidden">
                    <button onClick={() => createChat()} className="w-full h-16 flex items-center justify-center font-bold text-white  active:shadow-lg  bg-[##ffffff19]">
                        {loading ? <RotatingLines width="20" strokeColor="#ffff" /> : <span>Create Chat</span>}
                    </button>
                </div>
            </RippleButton>
        </div>
    </aside>;
};

export default SideNavigation;
