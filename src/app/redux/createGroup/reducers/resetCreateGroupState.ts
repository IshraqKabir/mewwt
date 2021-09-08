import { ICreateGroupState } from "../types";

export const resetCreateGroupState = (state: ICreateGroupState) => {
    state.users = [];
    state.selectedUsers = [];
};
