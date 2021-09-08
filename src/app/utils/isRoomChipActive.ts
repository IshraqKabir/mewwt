import { IChatMate } from "../types/IChatMate";
import { IRoomChip } from "../types/IRoomChip";
import { IUser } from "../types/IUser";
import { arrayToHash } from "./arrayToHash";

export const isRoomChipActive = (
    roomChip: IRoomChip,
    chatMates: IChatMate[],
    authUserId: number
): boolean => {
    if (authUserId === 0) return false;

    let isActive = false;

    const chatMatesHash = arrayToHash<IChatMate>(chatMates, "id");

    roomChip?.users?.forEach((user) => {
        if (
            user.id !== authUserId &&
            chatMatesHash[user.id]?.onlineStatus?.isOnline
        ) {
            isActive = true;
        }
    });

    return isActive;
};
