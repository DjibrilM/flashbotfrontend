import { atom } from 'recoil';

const globalUiState = atom({
    key: "uiatom",
    default: {
        chatsLoaded: false
    }
});
export default globalUiState;