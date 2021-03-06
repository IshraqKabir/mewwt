import { IReplyTo } from "./IReplyTo";

export type IMessage = {
    id?: number;
    text: string;
    sender_id?: number;
    sender_first_name?: string;
    sender_last_name?: string;
    room_id: number;
    created_at: string;
    readerIds?: (number | null)[];
    is_read?: boolean;
} & IReplyTo;
