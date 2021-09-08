import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { searchUsersThunk } from "../thunks/searchUsersThunk";
import { INewMessageState } from "../types";

export const newMessageExtraReducers = (builder: ActionReducerMapBuilder<INewMessageState>) => {
    builder.addCase(searchUsersThunk.fulfilled, (state: INewMessageState, { payload }) => {
        state.users = payload;
    });
};