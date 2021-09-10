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
import { getRoomMessagesThunk } from "../../../app/redux/rooms/thunks/getRoomMessagesThunk";
import { RootState } from "../../../app/redux/store";
import { readMessagesReq } from "../../../app/repository/message/readMessagesReq";
import { getToken } from "../../../app/repository/storage/getToken";
import { IMessage } from "../../../app/types/IMessage";
import { IRoomPresence } from "../../../app/types/IRoomPresence";
import { useRoomActivityStatus } from "./useRoomActivityStatus";
import { userStartedTyping as roomChipUserStartedTyping } from "../../../app/redux/chatList/chatListActions";
import { userStoppedTyping as roomChipUserStoppedTyping } from "../../../app/redux/chatList/chatListActions";

export const useRoom = (roomId: number) => {
    const dispatch = useDispatch();
    const {
        id,
        users,
        name,
        messages,
        messagesPageNumber,
        messagesHasNext,
        is_group,
        roomPresences
    } = useSelector((state: RootState) => {
        return singleRoomSelector(state, roomId);
    });
    const { user, chatMates } = useSelector(authSelector);
    const { status } = useRoomActivityStatus(
        users ?? [],
        is_group,
        user,
        chatMates
    );

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
        dispatch(initRoom(roomId));
        dispatch(getRoomDetailsThunk(roomId));
    }, []);

    useEffect(() => {
        // console.log(`message page number changed to: ${messagesPageNumber}`);
        if (messagesHasNext && messagesPageNumber !== 1) {
            dispatch(
                getRoomMessagesThunk({
                    roomId: id,
                    page: messagesPageNumber || 2,
                })
            );
        }
    }, [messagesPageNumber]);

    useEffect(() => {
        if (messages) {
            const unreadMessages: number[] = messages
                .filter((message) => {
                    return (
                        message.sender_id !== user?.id &&
                        (message.readerIds
                            ? !message.readerIds.includes(user?.id || 0)
                            : true)
                    );
                })
                .map((message) => message.id || -1);

            if (unreadMessages.length !== 0) {
                readMessagesReq(roomId, unreadMessages);
                dispatch(
                    readMessages({
                        roomId,
                        messageIds: unreadMessages,
                        readerId: user?.id || 0,
                    })
                );
            }
        }
    }, [messages]);

    return {
        id,
        isInvalid: id === 0,
        name,
        users,
        messages,
        is_group,
        status,
        roomPresences,
        roomSocket
    };
};
