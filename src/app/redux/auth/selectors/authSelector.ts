import { RootState } from "../../store";

export const authSelector = (state: RootState) => {
    return state.auth;
};
