import { RootState } from "../../store";

export const chatListSelector = (state: RootState) => {
    return state.chatList;
};