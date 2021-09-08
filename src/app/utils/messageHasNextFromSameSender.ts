import { IMessage } from "../types/IMessage";

export const messageHasNextFromSameSender = (message: IMessage, nextMessage?: IMessage) => {
    return message.sender_id === nextMessage?.sender_id;
};