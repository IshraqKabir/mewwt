import { IUserOnlineStatus } from "../../../types/IUserOnlineStatus";
import { IAuthState } from "../types";

export const setChatMatesOnlineStatuses = (
    state: IAuthState,
    {
        payload: userOnlineStatuses,
    }: {
        payload: IUserOnlineStatus[];
    }
) => {
    state.chatMates = state.chatMates.map((chatMate) => {
        const userOnlineStatus = userOnlineStatuses.filter(
            (userOnlineStatus) => {
                return userOnlineStatus.userId === chatMate.id;
            }
        )[0];

        if (!userOnlineStatus) return chatMate;

        return {
            ...chatMate,
            onlineStatus: userOnlineStatus,
        };
    });
};
