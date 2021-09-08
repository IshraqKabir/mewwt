import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken } from "../../../repository/storage/getToken";

export const setTokenThunk = createAsyncThunk(
    "auth/setToken",
    async () => {
        return await getToken();
    }
);
