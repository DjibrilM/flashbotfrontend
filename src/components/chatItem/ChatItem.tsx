
import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/chatbot.png'
import { createRipples } from 'react-ripples';
import { useNavigate, useParams } from 'react-router';
import { useNavigation, Navigation } from 'react-router';
import { NavLink } from 'react-router-dom';


const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-full  rounded-md mb-4 cursor-pointer "
})

interface Props {
    id: string,
    messages: any[],
    date: string,
    isActive: boolean
}

const ChatItem: React.FC<Props> = ({ id, date, messages, isActive }) => {
    const navigate = useNavigate();
    const params = useParams();
    const [isCurrent, setIsCurrent] = useState<boolean>(false);


    useEffect(() => {
        if (params.id == id) {
            setIsCurrent(true);
        }
    }, [params.id])


    return <RippleButton>
        <NavLink
            className={({ isActive }) => { return ` ${isActive && ' border-[#ffffff15]'} w-full border-2 border-transparent rounded-md` }}
            to={'/conversation/' + id}>
            <div
                id={id}
                className={`w-full flex chatElement justify-between duration-300 p-3 h-[70px] bg-[#212d3f] rounded-md `}>
                <div className="flex  w-full h-full cursor-pointer  gap-2">
                    <div className="w-10 flex items-center rounded-full justify-center bg-[#ffffff0b] h-10">
                        <img src={logo} alt="" className="w-5" />
                    </div>
                    <div className="">
                        <h1 className="font-bold text-sm text-white"> {messages.length <= 0 ? <span>{id}</span> : <span>Elon musk</span>} </h1>
                        <p className="text-[10px] mt-2 text-gray-100">{date}</p>
                    </div>
                </div>

            </div>
        </NavLink>
    </RippleButton>
};

export default ChatItem;
