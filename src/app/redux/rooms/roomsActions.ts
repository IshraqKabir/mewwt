import { roomsSlice } from "./roomsSlice";

export const {
    initRoom,
    addMessage,
    incrementPage,
    readMessages,
    setUnreadMessagesCount,
} = roomsSlice.actions;
