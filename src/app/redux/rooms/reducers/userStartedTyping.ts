import { pluck } from "../../../utils/pluck";
import { IRoomsState } from "../types";

export const userStartedTyping = (
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
                        isPresent: true,
                        isTyping: true,
                    };
                }) : [...room.roomPresences, {
                    userId: payload.userId,
                    isPresent: true,
                    isTyping: true,
                }] : [{
                    userId: payload.userId,
                    isPresent: true,
                    isTyping: true,
                }];

        return {
            ...room,
            roomPresences: newRoomPresences
        };
    });

};
