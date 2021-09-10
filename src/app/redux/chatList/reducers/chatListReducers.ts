import { newRoomChip } from "./newRoomChip";
import { roomChipRead } from "./roomChipRead";
import { userStartedTyping } from "./userStartedTyping";
import { userStoppedTyping } from "./userStoppedTyping";

export const chatListReducers = {
    newRoomChip: newRoomChip,
    roomChipRead: roomChipRead,
    userStartedTyping: userStartedTyping,
    userStoppedTyping: userStoppedTyping
};
