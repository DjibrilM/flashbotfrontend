import { atom } from "recoil";

export interface Chat {
    id: string,
    createdAd: string,
    messages: any[]
}

export interface Chats {
    chats: Chat[],
}

const chatsAtom = atom<Chat[]>({
    key: "usechat",
    default: []
})

export default chatsAtom


