import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../../../../config/envs";
import { authSelector } from "../../../app/redux/auth/selectors/authSelector";
import {
    addMessage,
    initRoom,
    readMessages,
} from "../../../app/redux/rooms/roomsActions";
import { singleRoomSelector } from "../../../app/redux/rooms/selectors/singleRoomSelector";
import { getRoomDetailsThunk } from "../../../app/redux/rooms/thunks/getRoomDetailsThunk";
import { getRoomMessagesThunk } from "../../../app/redux/rooms/thunks/getRoomMessagesThunk";
import { RootState } from "../../../app/redux/store";
import { readMessagesReq } from "../../../app/repository/message/readMessagesReq";
import { getToken } from "../../../app/repository/storage/getToken";
import { IMessage } from "../../../app/types/IMessage";
import { useRoomActivityStatus } from "./useRoomActivityStatus";

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

        socket.on("connect", () => {
            console.log("room connected!");
        });

        socket.on("disconnect", () => {
            console.log("room disconnected :(");
        });

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

        return () => {
            socket.disconnect();
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
    };
};
