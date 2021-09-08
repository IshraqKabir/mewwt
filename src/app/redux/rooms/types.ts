import { IRoom } from "../../types/IRoom";
import { IUnreadMessagesCount } from "../../types/IUnreadMessagesCount";

export interface IRoomsState {
    rooms: IRoom[];
    unreadMessagesCount: IUnreadMessagesCount;
}
