import { IChatMate } from "../types/IChatMate";
import { arrayToHash } from "./arrayToHash";

export const hasChatMatesChanged = (prev: IChatMate[], next: IChatMate[]): boolean => {
    let chatMatesChanged = false;

    const prevChatMatesByIds = arrayToHash<IChatMate>(prev, "id");

    next.forEach((nextChatMate) => {
        if (nextChatMate.onlineStatus?.socketIds.length !== prevChatMatesByIds[nextChatMate.id].onlineStatus?.socketIds.length) {
            chatMatesChanged = true;
        }
    });

    return chatMatesChanged;
};
