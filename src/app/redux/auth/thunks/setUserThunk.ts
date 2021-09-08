import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../../repository/auth/getUser";

export const setUserThunk = createAsyncThunk(
    "auth/setUser",
    async () => {
        return await getUser();
    }
);
