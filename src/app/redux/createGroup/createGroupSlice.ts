import { createSlice } from "@reduxjs/toolkit";
import { createGroupExtraReducers } from "./extraReducers/createGroupExtraReducers";
import { createGroupInitialState } from "./createGroupInitialState";
import { createGroupReducers } from "./reducers/createGroupReducers";

export const createGroupSlice = createSlice({
    name: "createGroup",
    initialState: createGroupInitialState,
    reducers: createGroupReducers,
    extraReducers: createGroupExtraReducers,
});
