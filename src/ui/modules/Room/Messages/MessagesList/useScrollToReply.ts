import { useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { setShouldScrollToMessageId } from "../../../../../app/redux/rooms/roomsActions";
import { getRoomMessagesWithRangeThunk } from "../../../../../app/redux/rooms/thunks/getRoomMessagesWithRangeThunk";
import { IMessage } from "../../../../../app/types/IMessage";

export const useScrollToReply = (messages: IMessage[], roomId: number) => {
    const flatListRef = useRef<FlatList<any> | null>(null);
    const dispatch = useDispatch();

    const messagesRef = useRef<IMessage[]>([]);
    const scrollingToIndex = useRef<number | null>(null);

    messagesRef.current = [...messages];

    useEffect(() => {
        if (scrollingToIndex.current) {
            handleReplyToClick(scrollingToIndex.current);
        }
    }, [messages.length]);

    const handleReplyToClick = (reply_to_message_id: number) => {
        if (flatListRef.current) {
            let index: number | null = null;

            const messages = [...messagesRef.current];

            messages.forEach((message, i) => {
                if (Number(message.id) === Number(reply_to_message_id)) {
                    index = i;
                }
            });

            if (index) {
                flatListRef.current.scrollToIndex({
                    index: index,
                    animated: true,
                });

                scrollingToIndex.current = null;

                setTimeout(() => {
                    dispatch(setShouldScrollToMessageId({ roomId: roomId }));
                }, 2000);
            } else {
                // fetch messages with range -> allMessages[allMessages.length - 1].id - reply_to_message_id
                // increase page number to newAllMessages / 20 
                // IRoom should have a new optional attriubte:
                // shouldScrollToMessageId
                // each message should check if the value is same to shouldScrollToMessageId
                // then they will scroll to the shouldScrollToMessageId
                // and then set shouldScrollToMessageId to undefined
                const start = Number(messages[messages.length - 1].id);
                const end = reply_to_message_id;

                dispatch(setShouldScrollToMessageId({ roomId: roomId, shouldScrollToMessageId: reply_to_message_id }));
                dispatch(getRoomMessagesWithRangeThunk({
                    roomId: roomId,
                    start: start,
                    end: end,
                }));
                scrollingToIndex.current = reply_to_message_id;
            }
        }
    };

    return {
        flatListRef,
        handleReplyToClick
    };
};
