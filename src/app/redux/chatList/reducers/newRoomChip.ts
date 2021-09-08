import { IRoomChip } from "../../../types/IRoomChip";
import { IChatListState } from "../types";

export const newRoomChip = (
    state: IChatListState,
    { payload }: { payload: IRoomChip }
) => {
    const roomChip = payload;

    state.roomChips = [
        {
            ...roomChip,
            users:
                state.roomChips.find((rc) => rc.room_id === roomChip.room_id)
                    ?.users ?? [],
        },
        ...state.roomChips.filter((rC) => rC.room_id != roomChip.room_id),
    ];
};
