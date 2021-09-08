import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendMessage } from "../../../repository/message/sendMessage";
import { IMessage } from "../../../types/IMessage";

export interface ISendMessageThunk {
    roomId: number;
    message: IMessage;
}

export const sendMessageThunk = createAsyncThunk(
    "rooms/sendMessage",
    async ({ roomId, message }: ISendMessageThunk) => {
        return await sendMessage(roomId, message);
    },
);

