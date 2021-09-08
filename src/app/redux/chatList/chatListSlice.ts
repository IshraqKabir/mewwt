import { createSlice } from "@reduxjs/toolkit";
import { chatListExtraReducers } from "./extraReducers/chatListExtraReducers";
import { chatListReducers } from "./reducers/chatListReducers";
import { chatListInitialState } from "./chatListInitialState";

export const chatListSlice = createSlice({
    name: 'chatList',
    initialState: chatListInitialState,
    reducers: chatListReducers,
    extraReducers: chatListExtraReducers,
});


