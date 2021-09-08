import { IRoomsState } from "../types";

export const incrementPage = (state: IRoomsState, { payload: { roomId } }: { payload: { roomId: number; }; }) => {
    state.rooms = state.rooms.map(room => {
        if (room.id !== roomId) {
            return room;
        }

        if (!room.messagesHasNext) {
            return room;
        }

        return {
            ...room,
            messagesPageNumber: room.messagesPageNumber ? room.messagesPageNumber + 1 : 2,
        };
    });

};
