import { IRoomsState } from "../types";

export const setShouldScrollToMessageId = (
    state: IRoomsState,
    { payload: {
        shouldScrollToMessageId,
        roomId
    } }: {
        payload: {
            roomId: number;
            shouldScrollToMessageId?: number;
        };
    }
) => {
    if (!roomId) return;

    state.rooms = state.rooms.map((room) => {
        if (room.id !== roomId) {
            return room;
        }

        return {
            ...room,
            shouldScrollToMessageId: shouldScrollToMessageId
        };
    });
};
