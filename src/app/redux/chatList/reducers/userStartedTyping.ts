import { IChatListState } from "../types";

export const userStartedTyping = (
    state: IChatListState,
    { payload: { userId, roomId } }: {
        payload: {
            userId: number;
            roomId: number;
        };
    }
) => {
    if (!userId || !roomId) return;

    state.roomChips = state.roomChips.map(roomChip => {
        if (roomChip.room_id !== roomId) return roomChip;

        return {
            ...roomChip,
            users: roomChip.users ? roomChip.users.map(user => {
                if (Number(user.id) !== Number(userId)) return user;

                return {
                    ...user,
                    isTyping: true,
                };
            }) : [],
        };
    });
};
