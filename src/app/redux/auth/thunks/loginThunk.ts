import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserReq } from "../../../repository/auth/loginUserReq";
import { ILoginInput } from "../../../types/ILoginInput";

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (values: ILoginInput) => {
        return await loginUserReq(values);
    },
);
