import { IUnreadMessagesCount } from "../../../types/IUnreadMessagesCount";
import { IRoomsState } from "../types";

export const setUnreadMessagesCount = (
    state: IRoomsState,
    { payload }: { payload: IUnreadMessagesCount }
) => {
    if (!payload) return;

    state.unreadMessagesCount = payload;
};
