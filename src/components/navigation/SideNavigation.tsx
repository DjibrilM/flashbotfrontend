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
import { useNavigate } from "react-router";


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


    const logout = () => {
        
        setAuthorizationData({
            isLoggedIn: false,
            userProfileImage: "",
        });

        clearItem("auth");
        navigate({ pathname: "/login" });
    }


    return <aside style={isOpen ? { maxWidth: "350px" } : { maxWidth: "0px", }} className={`${!isOpen ? "overflow-hidden" : "flex"}  justify-between  flex-col custom-md:block hidden h-[calc(100vh-90px)] relative   duration-300  w-full`}>

        <nav className="w-full  h-[400px] overflow-hidden  bg-[#ffffff0b] rounded-md  ">

            <div className="w-full gap-2 text-white items-center flex pl-5 h-14 border-b bg-[#ffffff19] border-[#ffffff19]">
                <BsChatLeftDots />
                <h1 className="text-[18px] font-bold">Your Chat</h1>
            </div>

            <div className="w-full pr-1 mt-1">
                <div className="w-full overflow-auto sideMenu-container pr-1 pl-2 pt-3 h-[340px]">
                    <ChatItem />
                    <ChatItem />
                    <ChatItem />
                </div>
            </div>
        </nav>

        <div className="mt-10">
            <ul>
                <li className="flex mt-6  text-gray-200 gap-4 pb-4 border-b border-[#ffffff0b]  items-center font-bold">
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
                    <button className="w-full h-16 font-bold text-white  active:shadow-lg  bg-[##ffffff19]">
                        Create Chat
                    </button>
                </div>
            </RippleButton>
        </div>
    </aside>;
};

export default SideNavigation;
