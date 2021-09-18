import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateEffect } from "../../../app/customHooks/useUpdateEffect";
import { authSelector } from "../../../app/redux/auth/selectors/authSelector";
import { readMessages } from "../../../app/redux/rooms/roomsActions";
import { singleRoomSelector } from "../../../app/redux/rooms/selectors/singleRoomSelector";
import { getRoomMessagesThunk } from "../../../app/redux/rooms/thunks/getRoomMessagesThunk";
import { RootState } from "../../../app/redux/store";
import { readMessagesReq } from "../../../app/repository/message/readMessagesReq";

export const useRoomMessagesMisc = (roomId: number) => {
    const { user } = useSelector(authSelector);
    const {
        id,
        messages,
        messagesPageNumber,
        messagesHasNext,
    } = useSelector((state: RootState) => {
        return singleRoomSelector(state, roomId);
    });

    const dispatch = useDispatch();

    useEffect(() => {
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
        if (messages.length !== 0) {
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
};
