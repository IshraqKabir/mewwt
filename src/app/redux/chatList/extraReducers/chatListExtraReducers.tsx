import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getChatListThunk } from "../thunks/getChatListThunk";
import { IChatListState } from "../types";

export const chatListExtraReducers = (
    builder: ActionReducerMapBuilder<IChatListState>
) => {
    builder.addCase(
        getChatListThunk.fulfilled,
        (state: IChatListState, { payload }) => {
            state.roomChips = payload;
            state.isLoading = false;
        }
    );
    builder.addCase(getChatListThunk.pending, (state: IChatListState) => {
        state.isLoading = true;
    });
};
