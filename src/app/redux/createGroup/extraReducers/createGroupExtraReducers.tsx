import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { searchUsersThunk } from "../thunks/searchUsersThunk ";
import { ICreateGroupState } from "../types";

export const createGroupExtraReducers = (
    builder: ActionReducerMapBuilder<ICreateGroupState>
) => {
    builder.addCase(
        searchUsersThunk.fulfilled,
        (state: ICreateGroupState, { payload }) => {
            state.users = payload;
        }
    );
};
