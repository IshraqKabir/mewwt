import { RootState } from "../../store";

export const newMessageSelector = (state: RootState) => {
    return state.newMessage;
};