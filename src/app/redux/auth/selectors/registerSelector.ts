import { RootState } from "../../store";

export const registerSelector = (state: RootState) => {
    return state.auth.register;
};