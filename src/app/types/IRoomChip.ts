import { IUser } from "./IUser";

export interface IRoomChip {
    room_id: number;
    message_id: number;
    message_text: string;
    sender_id: number;
    sender_first_name: string;
    sender_last_name: string;
    room_name: string;
    user_count: number;
    message_created_at: string;
    is_read: boolean;
    is_group: boolean;
    users: (IUser & {
        isTyping: boolean;
    })[];
}
