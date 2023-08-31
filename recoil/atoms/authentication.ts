import { atom } from "recoil";

export const authenticationAtom = atom({
    key: "authentication-atom",
    default: {
        isLoggedIn: false,
        userProfileImage: "",
        email: ""
    }
});