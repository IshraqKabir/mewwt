import { createGroupSlice } from "./createGroupSlice";

export const { addUsers, selectUser, unSelectUser, resetCreateGroupState } =
    createGroupSlice.actions;
