import ChatItem from "../chatItem/ChatItem";
import { BsChatLeftDots } from "react-icons/bs";
import { IoMdClose } from 'react-icons/io'

const MobileSideMenu = () => {
    return <>
        <div className="w-full  h-screen fixed z-20 top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-[#0000007f]"></div>
        <nav className="fixed z-30  w-full max-w-[350px] h-screen bg-[#1b263a] left-0 top-0 bottom-0 p-2">
            <div className="w-full border-b flex justify-between border-[#ffffff1b] py-3">
                <div className="flex gap-4 items-center">
                    <BsChatLeftDots className="text-white text-[20px]" />
                    <h1 className=" font-bold text-[18px] text-white ">Your chats</h1>
                </div>

                <div className="w-7 h-7 flex items-center justify-center rounded-md border-[#ffffff26] border">
                    <IoMdClose className="text-white" />
                </div>
            </div>


            <div style={{ height: "600px" }} className="w-full sideMenu-container flex flex-col gap-3 overflow-auto  p-2 ">
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
                <ChatItem />
            </div>
        </nav>
    </>
        ;
};

export default MobileSideMenu;
