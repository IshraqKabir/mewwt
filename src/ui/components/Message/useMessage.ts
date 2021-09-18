import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
import { IMessage } from "../../../app/types/IMessage";
import { messageHasNextFromSameSender } from "../../../app/utils/messageHasNextFromSameSender";
import { messageHasPrevFromSameSender } from "../../../app/utils/messageHasPrevFromSameSender";
import { useMessageReply } from "./useMessageReply";

// TODO: fix bug of not updating isRead

export const useMessage = (
    index: number,
    message: IMessage,
    authUserId: number,
    allMessages: IMessage[],
    isGroup: boolean,
) => {
    const fromSelf = message.sender_id === authUserId;

    const { animatedStyles: messageReplyAnimatedStyles, gestureHandler } = useMessageReply(message, fromSelf);

    const hasPrevFromSameSender = useMemo(() => index === 0
        ? false
        : messageHasPrevFromSameSender(
            message,
            allMessages[index - 1]
        ), []);

    const hasNextFromSameSender = useMemo(() => index === allMessages.length - 1
        ? false
        : messageHasNextFromSameSender(
            message,
            allMessages[index + 1]
        )
        , []);

    const chatMate = useSelector((state: RootState) => {
        return !hasPrevFromSameSender ? state.auth.chatMates.filter(chatMate => chatMate.id === message.sender_id)[0] : null;
    }, (next, prev) => {
        let statusChanged = next?.onlineStatus?.isOnline !== prev?.onlineStatus?.isOnline;

        if (statusChanged) {
            return false;
        }

        return true;
    });

    const isUserOnline = useMemo(() => chatMate?.onlineStatus?.isOnline, [chatMate?.onlineStatus?.socketIds]);
    const showSenderName = isGroup;

    const isRead = useMemo(() => {
        return (message.readerIds?.filter((id) => id !== null)
            .length || 0) > 0;
    }, [message.readerIds]);

    return {
        gestureHandler,
        messageReplyAnimatedStyles,
        fromSelf,
        hasPrevFromSameSender,
        hasNextFromSameSender,
        isUserOnline,
        showSenderName,
        isRead,
    };
};
