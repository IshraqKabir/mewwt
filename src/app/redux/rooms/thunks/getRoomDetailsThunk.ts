import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRoomDetails } from "../../../repository/room/getRoomDetails";

export const getRoomDetailsThunk = createAsyncThunk(
    "rooms/getRoomDetails",
    async (roomId: number) => {
        return await getRoomDetails(roomId);
    }
);
