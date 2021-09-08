import { IChatMate } from "../types/IChatMate";
import { arrayToHash } from "./arrayToHash";

export const isMessageUserActive = (
    sender_id: number,
    chatUsers: IChatMate[]
): boolean => {
    let isActive = false;

    const chatMatesHash = arrayToHash<IChatMate>(chatUsers, "id");

    if (chatMatesHash[sender_id]?.onlineStatus?.isOnline) {
        isActive = true;
    }

    return isActive;
};
