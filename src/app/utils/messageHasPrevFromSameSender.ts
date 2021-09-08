import { IMessage } from "../types/IMessage";

export const messageHasPrevFromSameSender = (message: IMessage, prevMessage?: IMessage) => {
    return message.sender_id === prevMessage?.sender_id;
};