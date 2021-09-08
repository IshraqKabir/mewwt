import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "./authIntialState";
import { AuthExtraReducers } from "./extraReducers/authExtraReducers";
import { authReducers } from "./reducers/authReducers";

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: authReducers,
    extraReducers: AuthExtraReducers,
});


