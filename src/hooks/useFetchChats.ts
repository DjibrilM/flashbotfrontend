
import axios from "axios";
import { formatDate } from "../helpers/date";
import { useRecoilState } from "recoil";
import uiState from '../../recoil/atoms/sideNavigation';
import { useState } from "react";
import chatsAtom from "../../recoil/atoms/chats";
import { useLocalStorage } from "./localStorage";
import { fetchChatErrorMessage } from "../constants";
import globalstate from "../../recoil/atoms/ui";



interface returnedValue {
    fetchLoading: boolean,
    fetchChats: Function,
}

export const useFetchState = (): returnedValue => {
    const [uiAtom, setUiAtom] = useRecoilState(uiState);
    const [fetchLoading, setLoading] = useState<boolean>(false);
    const [chatState, setChatState] = useRecoilState(chatsAtom);
    const { getItem } = useLocalStorage();
    const [globalUiState, setGlobalUiState] = useRecoilState(globalstate);

    const fetchChats = async () => {
        setLoading(true);
        return axios.get("http://localhost:3000/conversation/chats/?pagination=" + uiAtom.pagination,
            {
                withCredentials: true,
                headers: {
                    Authorization: "Bearer " + getItem("auth").token,
                },
            })

            .then((request => {
                const formatedData = request.data.chats.map((chat: any) => {
                    return {
                        id: chat._id,
                        createdAd: formatDate(chat.createdAt),
                        messages: [...chat.messages]
                    }
                });

                const previousChats = [...chatState];
                const emptyArray = [...[]]
                setChatState([...emptyArray]);
                setChatState([...previousChats, ...formatedData]);


                const previousPagination = uiAtom.pagination;
                if (request.data.chats?.length > 1) {
                    setUiAtom({ ...uiAtom, itemCount: request.data.itemsCount, pagination: previousPagination + 1 });
                    setGlobalUiState({ ...globalUiState, chatsLoaded: true });
                }

                const timer = setTimeout(() => {
                    setLoading(false);
                    clearTimeout(timer);
                }, 1000);
            })).catch((error) => {
                console.log(error);
                setLoading(false);
                throw new Error(fetchChatErrorMessage);
            })


    }

    return {
        fetchLoading,
        fetchChats
    }
};


