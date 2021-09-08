import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../../../../../config/envs";
import { TOKEN_KEY } from "../../../consts/storageConsts";
import { chatMateLogin, chatMateLogout } from "../../../redux/auth/authActions";
import { authSelector } from "../../../redux/auth/selectors/authSelector";
import {
    newRoomChip,
    roomChipRead,
} from "../../../redux/chatList/chatListActions";
import { getToken } from "../../../repository/storage/getToken";
import { IRoomChip } from "../../../types/IRoomChip";

export const useUserSocket = () => {
    const { user } = useSelector(authSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) return;

        const socket = io(`${BACKEND_URL}/user`, {
            auth: async (cb) => {
                const token = await getToken();

                cb({
                    token: token,
                });
            },
        });

        // console.log("userid", user.id);

        // console.log(`${user.id}.${user.first_name}`, "trying to connect");

        socket.on("connect", () => {
            // console.log(`${user.id}.${user.first_name}`, "user connected :)");
        });

        socket.on("disconnect", () => {
            // console.log(
            //     `${user.id}.${user.first_name}`,
            //     "user disconnected :("
            // );
        });

        socket.on("message", (roomChip: IRoomChip) => {
            dispatch(newRoomChip(roomChip));
        });

        socket.on("message_read", (data: any) => {
            dispatch(
                roomChipRead({
                    room_id: Number(data.room_id),
                    reader_id: Number(data.reader_id),
                    authUserId: user?.id ?? 0,
                })
            );
        });

        socket.on("login", (data: { userId: number; socketIds: string[] }) => {
            // console.log(`${user.id} got notification login`, data);
            dispatch(chatMateLogin(data));
        });

        socket.on("logout", (data: { userId: number; socketIds: string[] }) => {
            // console.log(`${user.id} got notification logout`, data);
            dispatch(chatMateLogout(data));
        });

        return () => {
            socket.disconnect();
        };
    }, [user?.id]);

    return {
        isConnected: true,
    };
};
