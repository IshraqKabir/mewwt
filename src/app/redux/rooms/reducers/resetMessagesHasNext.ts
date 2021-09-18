import { IRoomsState } from "../types";

export const resetMessagesHasNext = (state: IRoomsState, { payload: { roomId } }: { payload: { roomId: number; }; }) => {
    state.rooms = state.rooms.map(room => {
        if (room.id !== roomId) {
            return room;
        }

        return {
            ...room,
            messagesHasNext: true,
        };
    });

};
