import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { BACKEND_URL } from "../../../config/envs";
import { TOKEN_KEY } from "../consts/storageConsts";

export const getUserSocketIoInstance = (userId: number, token: string) => {
    return io(`${BACKEND_URL}/user-${userId}`, {
        auth: async (cb) => {
            cb({
                token: token,
            });
        },
    });
};
