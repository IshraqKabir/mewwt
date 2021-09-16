import { IMessage } from "../../../types/IMessage";
import { IReplyTo } from "../../../types/IReplyTo";
import { IRoomsState } from "../types";

export const setReplyTo = (
    state: IRoomsState,
    { payload: {
        replyTo,
        roomId
    } }: {
        payload: {
            replyTo: IReplyTo | null;
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
            replyTo: replyTo ?? undefined,
        };
    });
};
