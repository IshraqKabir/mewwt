import { ISocket } from "../../../types/ISocket";
import { IAuthState } from "../types";

export const chatMateLogin = (
    state: IAuthState,
    {
        payload: socket,
    }: {
        payload: ISocket;
    }
) => {
    state.chatMates = state.chatMates.map((chatMate) => {
        if (chatMate.id !== socket.userId) return chatMate;

        return {
            ...chatMate,
            onlineStatus: {
                isOnline: true,
                userId: chatMate.id,
                socketIds: socket.socketIds,
                lastSeen: undefined,
            },
        };
    });
};
