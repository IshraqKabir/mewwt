import { createSlice } from "@reduxjs/toolkit";
import { newMessageExtraReducers } from "./extraReducers/newMessageExtraReducers";
import { newMessageInitialState } from "./newMessageInitialState";
import { newMessageReducers } from "./reducers/newMessageReducers";

export const newMessageSlice = createSlice({
    name: 'newMessage',
    initialState: newMessageInitialState,
    reducers: newMessageReducers,
    extraReducers: newMessageExtraReducers,
});


