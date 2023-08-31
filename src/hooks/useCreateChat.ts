import { useState } from "react"
import axios from "axios";
import { formatDate } from "../helpers/date";
import { Chat as ChatType } from '../../recoil/atoms/chats';
import { useLocalStorage } from './localStorage';
import { useRecoilState } from "recoil";
import chatsAtom from "../../recoil/atoms/chats";
import { useNavigate } from "react-router";

export const useCreateChat = (): { createChatLoading: boolean, createChat: Function } => {
    const [createChatLoading, setLoading] = useState<boolean>(false);
    const { getItem } = useLocalStorage();
    const [chatState, setChatState] = useRecoilState(chatsAtom);
    const navigate = useNavigate();

    const createChat = async () => {
        setLoading(true);

        return axios.post("http://localhost:3000/conversation/chat",
            {

            },
            {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + getItem("auth").token,
                }
            }).then((request) => {

                const newChat: ChatType = {
                    id: request.data._id,
                    createdAd: formatDate(request.data.createdAt),
                    messages: []
                };

                const previousChats: ChatType[] = [...chatState];
                previousChats.unshift(newChat);
                setChatState([...previousChats]);
                setLoading(false);
                navigate("/conversation/" + request.data._id,)
            }).catch(() => {
                setLoading(false)
                throw new Error("Failed to create chat please try again !")
            });



    };

    return { createChatLoading, createChat }
}

