import { atom } from "recoil";


const uiAtom = atom({
    key: "ui-atom",
    default: {
        pagination: 1,
        itemCount: 0,
    }
});

export default uiAtom;