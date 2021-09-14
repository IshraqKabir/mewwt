import { roomsSlice } from "./roomsSlice";

export const {
    initRoom,
    addMessage,
    incrementPage,
    readMessages,
    setUnreadMessagesCount,
    userJoined,
    userLeft,
    userStartedTyping,
    userStoppedTyping,
    setReplyTo,
} = roomsSlice.actions;
