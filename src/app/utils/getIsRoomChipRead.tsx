import { IRoomChip } from "../types/IRoomChip";

export const getIsRoomChipRead = (roomChip: IRoomChip, authUserId?: number) => {
    if (authUserId === roomChip.sender_id) {
        return true;
    }

    return roomChip.is_read;
};
