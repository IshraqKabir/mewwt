import { IChatMate } from "../types/IChatMate";
import { IMessage } from "../types/IMessage";
import { arrayToHash } from "./arrayToHash";

export const isMessageUserActive = (
    sender_id: number,
    chatUsers: IChatMate[],
    message?: IMessage
): boolean => {
    let isActive = false;

    const chatMatesHash = arrayToHash<IChatMate>(chatUsers, "id");

    if (chatMatesHash[sender_id]?.onlineStatus?.isOnline) {
        isActive = true;
    }

    return isActive;
};
