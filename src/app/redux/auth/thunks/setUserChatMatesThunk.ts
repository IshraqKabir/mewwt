import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserChatMates } from "../../../repository/auth/getUserChatMates";

export const setUserChatMatesThunk = createAsyncThunk(
    "auth/setUserChatMates",
    async () => {
        return await getUserChatMates();
    }
);
