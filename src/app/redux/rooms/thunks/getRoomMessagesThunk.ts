import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRoomMessages } from "../../../repository/room/getRoomMessages";

export interface IGetRoomMessagesThunk {
    roomId: number;
    page: number;
}

export const getRoomMessagesThunk = createAsyncThunk(
    "rooms/getRoomMessages",
    async ({ roomId, page }: IGetRoomMessagesThunk) => {
        return {
            roomId: roomId,
            messages: await getRoomMessages(roomId, page)
        };
    },
);
