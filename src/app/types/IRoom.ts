import { IMessage } from "./IMessage";
import { IReplyTo } from "./IReplyTo";
import { IRoomPresence } from "./IRoomPresence";
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
    roomPresences: IRoomPresence[];
    replyTo?: IReplyTo;
    shouldScrollToMessageId?: number;
}
