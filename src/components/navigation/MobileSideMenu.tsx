import ChatItem from "../chatItem/ChatItem";
import { BsChatLeftDots } from "react-icons/bs";
import { IoMdClose } from 'react-icons/io'
import { createRipples } from "react-ripples";


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
    return <>
        <div style={!IsOpen ? { width: "0px" } : {}} onClick={()=> onClose()} className="w-full custom-md:hidden   h-screen fixed z-20 top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-[#0000007f]"></div>
        <nav style={IsOpen ? { left: "0px" } : { left: "-400px" }} className="fixed z-30 duration-500 custom-md:hidden   w-full max-w-[350px] h-screen bg-[#1b263a] left-0 top-0 bottom-0 ">
            <div className="w-full bg-[#ffffff19] border-b h-16 p-4 flex justify-between border-[#ffffff1b]">
                <div className="flex gap-4 items-center">
                    <BsChatLeftDots className="text-white text-[20px]" />
                    <h1 className=" font-bold text-[18px] text-white ">Your chats</h1>
                </div>

                <div onClick={() => onClose()} className="w-7 cursor-pointer  h-7 flex items-center justify-center rounded-md border-[#ffffff26] border">
                    <IoMdClose className="text-white" />
                </div>
            </div>

            <div style={{ height: "calc(100% - 160px)" }} className="w-full sideMenu-container inline-block mt-2 gap-3 overflow-auto  p-2 ">
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
            <div className="w-full p-2 flex  justify-center">
                <RippleButton >
                    <div className="bg-[#ffffff0b] max-w-[350px] w-full rounded-md overflow-hidden">
                        <button className="w-full h-16 font-bold text-white  active:shadow-lg  bg-[##ffffff19]">
                            Create Chat
                        </button>
                    </div>
                </RippleButton>
            </div>
        </nav>
    </>
        ;
};

export default MobileSideMenu;
