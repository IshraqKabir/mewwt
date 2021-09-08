import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerUserReq } from "../../../repository/auth/registerUserReq";
import { IRegisterInput } from "../../../types/IRegisterInput";

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (values: IRegisterInput) => {
        return await registerUserReq(values);
    },
);
