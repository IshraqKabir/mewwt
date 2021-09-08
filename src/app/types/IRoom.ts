import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IRoom {
    id: number;
    name: string;
    is_group: boolean;
    users?: IUser[];
    messages: IMessage[];
    messagesPageNumber?: number;
    messagesHasNext?: boolean;
    isFetchingNewMessages?: boolean;
}
