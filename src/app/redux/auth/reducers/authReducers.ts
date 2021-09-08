import { chatMateLogin } from "./chatMateLogin";
import { chatMateLogout } from "./chatMateLogout";
import { logout } from "./logout";
import { setChatMatesOnlineStatuses } from "./setChatMatesOnlineStatuses";

export const authReducers = {
    logout: logout,
    setChatMatesOnlineStatuses: setChatMatesOnlineStatuses,
    chatMateLogin: chatMateLogin,
    chatMateLogout: chatMateLogout,
};
