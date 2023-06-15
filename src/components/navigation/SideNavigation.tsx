import { BsChatLeftDots } from "react-icons/bs";
import ChatItem from "../chatItem/ChatItem";
import { BiLogOut } from 'react-icons/bi';
import { createRipples } from 'react-ripples'
import React from "react";
import Switch from "../switch/Switch";

const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-full rounded-md "
})

interface Props {
    isOpen: boolean
}


const SideNavigation: React.FC<Props> = ({ isOpen }) => {
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


                <li className="flex text-gray-200 mt-4  gap-4 items-center font-bold">
                    <BiLogOut className="text-2xl" />
                    <span>Logout</span>
                </li>
            </ul>
        </div>

        <div style={{ maxWidth: "350px" } } className=" absolute bottom-0 w-full">
            <RippleButton  >
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
