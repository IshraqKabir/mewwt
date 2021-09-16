import { IRoomsState } from "../types";

export const readMessages = (
    state: IRoomsState,
    {
        payload: { roomId, messageIds, readerId },
    }: {
        payload: {
            roomId: number;
            messageIds: number[];
            readerId: number;
        };
    }
) => {
    if (messageIds.length === 0 || readerId === -1) return;

    state.rooms = state.rooms.map((room) => {
        if (room.id !== roomId) {
            return room;
        }

        return {
            ...room,
            messages: room.messages
                ? room.messages.map((message) => {
                    if (!messageIds.includes(message.id || -1)) {
                        return message;
                    }

                    return {
                        ...message,
                        readerIds: [readerId, ...(message.readerIds || [])],
                    };
                })
                : [],
        };
    });
};
