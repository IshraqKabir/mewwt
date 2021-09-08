import { createSlice } from "@reduxjs/toolkit";
import { roomsExtraReducers } from "./extraReducers/roomsExtraReducers";
import { roomsReducers } from "./reducers/roomsReducers";
import { roomsInitialState } from "./roomsInitialiState";

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: roomsInitialState,
    reducers: roomsReducers,
    extraReducers: roomsExtraReducers,
});


