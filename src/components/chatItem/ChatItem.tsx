
import React, { useEffect, useRef } from 'react';
import logo from '../../assets/chatbot.png'
import { createRipples } from 'react-ripples';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';


const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-full my-2  rounded-md cursor-pointer"
})

interface Props {
    id: string,
    messages: any[],
    date: string,
}

const ChatItem: React.FC<Props> = ({ id, date, messages }) => {
    const params = useParams();
    const element = useRef<HTMLDivElement>();



    useEffect(() => {
        if (params.id === id) {
            element.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [params.id])


    return <RippleButton  >
        <NavLink
            ref={(el: HTMLDivElement | any) => element.current = el}
            className={({ isActive }) => { return ` ${isActive ? ' border-[#ffffff1f] ' : 'border-transparent'} w-full border-2  rounded-md` }}
            to={'/conversation/' + id}>
            <div
                id={id}
                className={`w-full flex chatElement justify-between duration-300 p-3 h-[70px] bg-[#212d3f] rounded-md `}>
                <div className="flex  w-full h-full cursor-pointer  gap-2">
                    <div className="w-10 flex items-center rounded-full justify-center bg-[#ffffff0b] h-10">
                        <img src={logo} alt="" className="w-5" />
                    </div>
                    <div className="">
                        <h1 className="text-sm text-white"> {messages?.length <= 0 ? <span>No message yet</span> : <span>Elon musk</span>} </h1>
                        <p className="text-[10px] mt-2 text-gray-100">{date}</p>
                    </div>
                </div>

            </div>
        </NavLink>
    </RippleButton>
};

export default ChatItem;
