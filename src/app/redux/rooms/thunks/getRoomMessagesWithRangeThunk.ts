import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRoomMessagesWithRange } from "../../../repository/room/getRoomMessagesWithRange";

export interface IGetRoomMessagesWithRangeThunk {
    roomId: number;
    start: number;
    end: number;
}

export const getRoomMessagesWithRangeThunk = createAsyncThunk(
    "rooms/getRoomMessagesWithRange",
    async ({ roomId, start, end }: IGetRoomMessagesWithRangeThunk) => {
        return await getRoomMessagesWithRange(roomId, start, end);
    },
);
