import { IUser } from "./IUser";

export interface IMessage {
    id?: number;
    text: string;
    sender_id?: number;
    sender_first_name?: string;
    sender_last_name?: string;
    sender?: IUser;
    fromSelf?: boolean;
    room_id: number;
    created_at: string;
    readerIds?: (number | null)[];
    is_read?: boolean;
}
