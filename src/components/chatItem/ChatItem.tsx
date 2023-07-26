
import React from 'react';
import logo from '../../assets/chatbot.png'
import { createRipples } from 'react-ripples';
import { useNavigate, useParams } from 'react-router';


const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-full rounded-md mb-4 cursor-pointer "
})

interface Props {
    id: string,
    messages: any[],
    date: string
}

const ChatItem: React.FC<Props> = ({ id, date, messages }) => {
    const navigate = useNavigate();
    const params = useParams();

    return <RippleButton>
        <div onClick={() => params.id !== id && navigate({ pathname: "conversation/" + id })} className={`w-full flex border-2 justify-between p-3 h-[70px] bg-[#212d3f] rounded-md ${params.id === id ? 'border-[#ffffff24]' : "border-transparent"}`}>
            <div className="flex  w-full h-full cursor-pointer  gap-2">
                <div className="w-10 flex items-center rounded-full justify-center bg-[#ffffff0b] h-10">
                    <img src={logo} alt="" className="w-5" />
                </div>
                <div className="">
                    <h1 className="font-bold text-sm text-white"> {messages.length <= 0 ? <span>No message yet</span> : <span>Elon musk</span>} </h1>
                    <p className="text-[10px] mt-2 text-gray-100">{date}</p>
                </div>
            </div>

        </div>
    </RippleButton>
};

export default ChatItem;
