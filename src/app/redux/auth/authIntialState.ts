import { IAuthState } from "./types";

export const authInitialState = {
    user: null,
    authToken: "",
    login: {
        state: "idle",
        errors: [],
    },
    register: {
        state: "idle",
        errors: [],
    },
    chatMates: [],
} as IAuthState;
