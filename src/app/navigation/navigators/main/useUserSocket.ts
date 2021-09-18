import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../../../../../config/envs";
import { chatMateLogin, chatMateLogout } from "../../../redux/auth/authActions";
import { authSelector } from "../../../redux/auth/selectors/authSelector";
import {
    newRoomChip,
    roomChipRead,
    userStartedTyping,
    userStoppedTyping,
} from "../../../redux/chatList/chatListActions";
import { addMessage } from "../../../redux/rooms/roomsActions";
import { getToken } from "../../../repository/storage/getToken";
import { IMessage } from "../../../types/IMessage";
import { IRoomChip } from "../../../types/IRoomChip";

export const useUserSocket = () => {
    const { user } = useSelector(authSelector, (next, prev) => {
        return next.user?.id === prev.user?.id;
    });

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

        socket.on("message", ({ roomChip, message }: { roomChip: IRoomChip, message: IMessage; }) => {
            dispatch(newRoomChip(roomChip));
            dispatch(addMessage(message));
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

        socket.on("login", (data: { userId: number; socketIds: string[]; }) => {
            dispatch(chatMateLogin(data));
        });

        socket.on("logout", (data: { userId: number; socketIds: string[]; }) => {
            dispatch(chatMateLogout(data));
        });

        socket.on("user-started-typing", ({ userId, roomId }: { userId: number, roomId: number; }) => {
            dispatch(userStartedTyping({ roomId: roomId, userId: userId }));
        });

        socket.on("user-stopped-typing", ({ userId, roomId }: { userId: number, roomId: number; }) => {
            dispatch(userStoppedTyping({ roomId: roomId, userId: userId }));
        });

        return () => {
            socket.disconnect();
        };
    }, [user?.id]);

    return {
        isConnected: true,
    };
};
