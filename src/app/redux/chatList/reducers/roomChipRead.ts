import { IChatListState } from "../types";

export const roomChipRead = (
    state: IChatListState,
    {
        payload: { room_id, reader_id, authUserId },
    }: {
        payload: {
            room_id: number;
            reader_id: number;
            authUserId: number;
        };
    }
) => {
    state.roomChips = state.roomChips.map((rc) => {
        if (rc.room_id !== room_id) {
            return rc;
        }

        return {
            ...rc,
            is_read: rc.sender_id === authUserId ? true
                : reader_id === authUserId
        };
    });
};
