import { IRoom } from "../types/IRoom";

export const getUnreadMessagesCount = (
    rooms: IRoom[]
): {
    chats: number;
    groups: number;
} => {
    

    return {
        chats: 0,
        groups: 0,
    };
};
