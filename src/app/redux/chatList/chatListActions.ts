import { chatListSlice } from "./chatListSlice";

export const {
    newRoomChip,
    roomChipRead,
    userStartedTyping,
    userStoppedTyping
} = chatListSlice.actions;
