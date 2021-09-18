import { useRef } from "react";
import { FlatList } from "react-native";
import { IMessage } from "../../../../../app/types/IMessage";

export const useScrollToReply = (messages: IMessage[]) => {
    const flatListRef = useRef<FlatList<any> | null>(null);

    const handleReplyToClick = (reply_to_message_id: number) => {
        if (flatListRef.current) {
            let index: number | null = null;

            messages.forEach((message, i) => {
                if (message.id === reply_to_message_id) {
                    index = i;
                }
            });

            if (index) {
                flatListRef.current.scrollToIndex({
                    index: index,
                    animated: true,
                });
            } else {
                // fetch messages with range -> allMessages[allMessages.length - 1].id - reply_to_message_id
                // increase page number to newAllMessages / 20 
                // IRoom should have a new optional attriubte:
                // shouldScrollToMessageId
                // each message should check if the value is same to shouldScrollToMessageId
                // then they will scroll to the shouldScrollToMessageId
                // and then set shouldScrollToMessageId to undefined
            }
        }
    };

    return {
        flatListRef,
        handleReplyToClick
    };
};
