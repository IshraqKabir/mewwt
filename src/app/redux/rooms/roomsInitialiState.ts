import { IRoomsState } from "./types";

export const roomsInitialState = {
    rooms: [],
    unreadMessagesCount: {
        chats: 0,
        groups: 0,
    },
} as IRoomsState;
