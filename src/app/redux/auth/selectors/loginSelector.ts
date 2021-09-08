import { RootState } from "../../store";

export const loginSelector = (state: RootState) => {
    return state.auth.login;
};