import { IRoomPresence } from "../../../types/IRoomPresence";
import { pluck } from "../../../utils/pluck";
import { IRoomsState } from "../types";

export const userJoined = (
    state: IRoomsState,
    { payload }: {
        payload: {
            roomId: number;
            roomPresence: IRoomPresence;
        };
    }
) => {
    if (!payload.roomPresence || !payload.roomId) return;

    state.rooms = state.rooms.map(room => {
        if (room.id !== payload.roomId) return room;

        const newRoomPresences = room.roomPresences ?
            pluck(room.roomPresences, "userId").includes(payload.roomPresence.userId)
                ? room.roomPresences.map(rP => {
                    if (rP.userId !== payload.roomPresence.userId) return rP;

                    return payload.roomPresence;
                }) : [...room.roomPresences, payload.roomPresence] : [payload.roomPresence];

        return {
            ...room,
            roomPresences: newRoomPresences
        };
    });

};
