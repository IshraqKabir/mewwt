import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChatMatesOnlineStatuses } from "../../../repository/auth/getChatMatesOnlineStatuses";

export const setChatMatesOnlineStatusesThunk = createAsyncThunk(
    "auth/setChatMatesOnlineStatusesThunk",
    async (chatMatesIds: number[]) => {
        return await getChatMatesOnlineStatuses(chatMatesIds);
    }
);
