import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { BACKEND_URL } from "../../../../config/envs";
import { authSelector } from "../../../app/redux/auth/selectors/authSelector";
import {
    addMessage,
    initRoom,
    readMessages,
    userJoined,
    userLeft,
    userStartedTyping,
    userStoppedTyping,
} from "../../../app/redux/rooms/roomsActions";
import { singleRoomSelector } from "../../../app/redux/rooms/selectors/singleRoomSelector";
import { getRoomDetailsThunk } from "../../../app/redux/rooms/thunks/getRoomDetailsThunk";
import { RootState } from "../../../app/redux/store";
import { getToken } from "../../../app/repository/storage/getToken";
import { IMessage } from "../../../app/types/IMessage";
import { IRoom } from "../../../app/types/IRoom";
import { IRoomPresence } from "../../../app/types/IRoomPresence";
import { hasChatMatesChanged } from "../../../app/utils/hasChatMatesChanged";

export const useInitRoom = (roomId: number) => {
    const { user, } = useSelector(authSelector, () => true);

    const {
        id,
        is_group,
        messages,
        name
    } = useSelector((state: RootState) => {
        return singleRoomSelector(state, roomId);
    }, (next: IRoom, prev: IRoom) => {
        if (next.is_group !== prev.is_group) {
            return false;
        }

        return next.id === prev.id;
    });

    const dispatch = useDispatch();
    const [roomSocket, setRoomSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socket = io(`${BACKEND_URL}/room`, {
            auth: async (cb) => {
                const token = await getToken();

                cb({
                    token: token,
                    roomId: roomId,
                });
            },
        });

        setRoomSocket(socket);

        socket.on("message", (message: IMessage) => {
            console.log(message);

            if (message.sender_id === user?.id) return;

            dispatch(addMessage(message));
        });

        socket.on("message_read", (data: any) => {
            if (data.reader_id === user?.id) return;

            dispatch(
                readMessages({
                    roomId: data.room_id,
                    messageIds: data.message_ids,
                    readerId: data.reader_id,
                })
            );
        });

        socket.on("user-joined", (data: IRoomPresence) => {
            dispatch(userJoined({
                roomId: roomId,
                roomPresence: data
            }));
        });

        socket.on("user-left", (data: IRoomPresence) => {
            dispatch(userLeft({
                roomId: roomId,
                roomPresence: data
            }));
        });

        socket.on("user-started-typing", ({ userId }: { userId: number; }) => {
            if (userId === user?.id) return;

            dispatch(userStartedTyping({ userId: userId, roomId: roomId }));
        });

        socket.on("user-stopped-typing", ({ userId }: { userId: number; }) => {
            if (userId === user?.id) return;

            dispatch(userStoppedTyping({ userId: userId, roomId: roomId }));
        });

        return () => {
            socket.disconnect();
            setRoomSocket(null);
        };
    }, []);

    useEffect(() => {
        if (!name) {
            dispatch(initRoom(roomId));
            dispatch(getRoomDetailsThunk(roomId));
        }
    }, []);

    return {
        id,
        isInvalid: id === 0,
        roomSocket,
        user,
        isGroup: is_group,
    };
};
