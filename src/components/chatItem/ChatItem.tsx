
import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/chatbot.png'
import { createRipples } from 'react-ripples';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import AlertPopUp from '../popup/AlertPopUp';
import axios from 'axios';
import { useLocalStorage } from '../../hooks/localStorage';
import ErrorPopup from '../popup/ErrorPopup';
import { useRecoilState } from 'recoil';
import chatsAtom from '../../../recoil/atoms/chats';
import { useNavigate } from 'react-router';


const RippleButton = createRipples({
    color: "#ffffff0b",
    during: 600,
    className: "w-full my-2  rounded-md cursor-pointer  flex items-center gap-2"
});

interface Props {
    id: string,
    messages: any[],
    date: string,
}

const ChatItem: React.FC<Props> = ({ id, date, messages }) => {
    const params = useParams();
    const element = useRef<HTMLDivElement>();
    const [active, setActive] = useState<boolean>(false);
    const [deletionLoading, setDeletionLoading] = useState<boolean>(false);
    const [openAlertModal, setOpenModal] = useState<boolean>(false);
    const [openErrorModal, setErrorModal] = useState<boolean>(false);
    const [chats, setChats] = useRecoilState(chatsAtom);
    const { getItem } = useLocalStorage();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.id === id) {
            element.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [params.id])


    const deletChat = async () => {

        try {
            await axios.post('http://localhost:3000/conversation/delete-chat', {
                chatId: params.id
            }, {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + getItem("auth").token,
                }
            }
            );

            const index = chats.findIndex((chatEl) => chatEl.id === params.id);
            const previousState = [...chats];
            previousState.splice(index, 1);
            setChats([...previousState]);
            setOpenModal(false);

            navigate("home");


        } catch (error) {
            setDeletionLoading(false);
            setErrorModal(true);
            setOpenModal(false);
        };
    }

   
    return <>
        <div className=' flex items-center gap-2'>
            <RippleButton  >
                <NavLink
                    ref={(el: HTMLDivElement | any) => element.current = el}
                    className={({ isActive }) => {
                        setActive(isActive);
                        return ` ${isActive ? ' border-[#ffffff1f] ' : 'border-transparent'} bg-[#212d3f] w-full border-2  rounded-md`
                    }}
                    to={'/conversation/' + id}>
                    <div
                        id={id}
                        className={`w-full flex chatElement justify-between duration-300 p-3 h-[70px] rounded-md `}>
                        <div className="flex  w-full h-full cursor-pointer  gap-2">
                            <div className="w-10 flex items-center rounded-full justify-center bg-[#ffffff0b] h-10">
                                <img src={logo} alt="" className="w-5" />
                            </div>
                            <div className="">
                                <h1 className="text-[13px] text-white"> {messages?.length <= 0 ? <span>No message yet</span> : <span>{messages[0].prompt.split('').slice(0, 25).join("")}...</span>} </h1>
                                <p className="text-[10px] mt-2 text-gray-100">{date}</p>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </RippleButton>

            <button onClick={(() => setOpenModal(true))} style={active ? { transform: " scale(1)", width: '3rem' } : { transform: " scale(0)", width: "0px" }} className="overflow-hidden duration-200 h-11 bg-[#212d3f] text-sm text-slate-200 f-full  flex items-center justify-center rounded-full">
                <FiTrash2 />
            </button>
        </div>

        <AlertPopUp
            action={() => deletChat()}
            close={() => setOpenModal(false)}
            open={openAlertModal}
            title="Continue"
            description='The following chat will be deleted'
            Loading={deletionLoading} />
        <ErrorPopup
            open={openErrorModal}
            errorMessage='Failed to delete chat please try again later'
            close={() => setErrorModal(false)}
        />
    </>
};

export default ChatItem;
