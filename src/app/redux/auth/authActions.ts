import { authSlice } from "./authSlice";

export const {
    logout,
    setChatMatesOnlineStatuses,
    chatMateLogin,
    chatMateLogout,
} = authSlice.actions;
