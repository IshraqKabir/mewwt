import { pluck } from "../../../utils/pluck";
import { IRoomsState } from "../types";

export const userStoppedTyping = (
    state: IRoomsState,
    { payload }: {
        payload: {
            roomId: number;
            userId: number;
        };
    }
) => {
    if (!payload.userId || !payload.roomId) return;

    state.rooms = state.rooms.map(room => {
        if (room.id !== payload.roomId) return room;

        const newRoomPresences = room.roomPresences ?
            pluck(room.roomPresences, "userId").includes(payload.userId)
                ? room.roomPresences.map(rP => {
                    if (rP.userId !== payload.userId) return rP;

                    return {
                        ...rP,
                        isTyping: false,
                    };
                }) : [...room.roomPresences, {
                    userId: payload.userId,
                    isPresent: false,
                    isTyping: false,
                }] : [{
                    userId: payload.userId,
                    isPresent: false,
                    isTyping: false,
                }];

        return {
            ...room,
            roomPresences: newRoomPresences
        };
    });

};
