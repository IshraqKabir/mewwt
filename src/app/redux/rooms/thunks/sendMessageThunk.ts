import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessage } from "../../../repository/message/sendMessage";
import { IMessage } from "../../../types/IMessage";
import { IReplyTo } from "../../../types/IReplyTo";

export interface ISendMessageThunk {
    roomId: number;
    message: IMessage;
    replyTo?: IReplyTo;
}

export const sendMessageThunk = createAsyncThunk(
    "rooms/sendMessage",
    async ({ roomId, message, replyTo }: ISendMessageThunk) => {
        return await sendMessage(roomId, message, replyTo);
    },
);

