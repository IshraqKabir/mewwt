import { IMessage } from "../../../types/IMessage";
import { IRoomsState } from "../types";

export const setReplyTo = (
    state: IRoomsState,
    { payload: {
        message,
        roomId
    } }: {
        payload: {
            message: IMessage | null;
            roomId: number;
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
            replyTo: message ?? undefined,
        };
    });
};
