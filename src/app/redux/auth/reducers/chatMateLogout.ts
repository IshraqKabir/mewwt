import { ISocket } from "../../../types/ISocket";
import { IAuthState } from "../types";

export const chatMateLogout = (
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
                isOnline: socket.socketIds.length > 0,
                userId: chatMate.id,
                socketIds: [
                    ...socket.socketIds,
                    ...(chatMate.onlineStatus?.socketIds ?? []),
                ],
                lastSeen: new Date().toUTCString(),
            },
        };
    });
};
