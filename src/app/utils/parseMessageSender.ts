import { IMessage } from "../types/IMessage";
import { IUser } from "../types/IUser";

export const parseMessageSender = (message: IMessage, roomUsers: IUser[] | undefined, currentUser: IUser | null): IMessage => {
    if (message.sender_id === currentUser?.id) {
        return {
            ...message,
            fromSelf: true,
        };
    }

    let sender: IUser | null = null;
    let fromSelf = false;

    roomUsers?.forEach(user => {
        if (message.sender_id === user.id) {
            sender = { ...user };
        }

        if (message.sender_id === currentUser?.id) {
            fromSelf = true;
        }
    });

    return {
        ...message,
        sender: sender ?? undefined,
        fromSelf: fromSelf,
    };
};