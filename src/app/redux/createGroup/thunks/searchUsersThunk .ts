import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchUsers } from "../../../repository/users/searchUsers";

export const searchUsersThunk = createAsyncThunk(
    "createGroup/searchUsers",
    async (text: string) => {
        return await searchUsers(text);
    }
);
