import { BsChatLeftDots } from "react-icons/bs";
import ChatItem from "../chatItem/ChatItem";
import { BiLogOut } from 'react-icons/bi';
import { SlSettings } from 'react-icons/sl'
import { createRipples } from 'react-ripples'

const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-full rounded-md "
})


const SideNavigation = () => {
    return <aside className="max-w-[350px]  duration-150 ml-5 w-full">
        <nav className="w-full  h-[400px] overflow-hidden  bg-[#ffffff0b] rounded-md  ">
            <div className="w-full gap-2 text-white items-center flex pl-5 h-14 border-b bg-[#ffffff19] border-[#ffffff19]">
                <BsChatLeftDots />
                <h1 className="text-[18px] font-bold">Your Chat</h1>
            </div>

            <div className="w-full pr-1 mt-1">
                <div className="w-full flex flex-col gap-3 overflow-auto sideMenu-container p-2 h-[340px]">
                    <ChatItem />
                </div>
            </div>
        </nav>

        <div className="mt-5">
            <ul>
                <li className="flex text-gray-200 border-b border-[#ffffff0b] pb-7 gap-4 items-center font-bold">
                    <BiLogOut className="text-2xl" />
                    <span>Logout</span>
                </li>


                <li className="flex mt-6  text-gray-200 gap-4 items-center font-bold">
                    <SlSettings className="text-2xl text-white" />
                    <span>Setting</span>
                </li>

            </ul>
        </div>



        <div className="h-5"></div>
        <RippleButton >
            <div className="bg-[#ffffff0b] max-w-[350px] w-full rounded-md overflow-hidden">
                <button className="w-full h-16 font-bold text-white  active:shadow-lg  bg-[##ffffff19]">
                    Create Chat
                </button>
            </div>
        </RippleButton>
    </aside>;
};

export default SideNavigation;
