import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChatlist } from "../../../repository/chatList/getChatList";

export const getChatListThunk = createAsyncThunk(
    "chatList/getChatList",
    async () => {
        return await getChatlist();
    }
);
