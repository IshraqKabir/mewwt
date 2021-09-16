import { IMessage } from "../../../types/IMessage";
import { IRoomsState } from "../types";

export const addMessage = (
    state: IRoomsState,
    { payload }: { payload: IMessage | null; }
) => {
    if (!payload) return;
    const message = payload;

    state.rooms = state.rooms.map((room) => {
        if (room.id !== message.room_id) {
            return room;
        }

        const roomMessages = [message, ...room.messages];

        room.messages = roomMessages;

        return room;
    });
};
