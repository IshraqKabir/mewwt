import { addUsers } from "./addUsers";
import { resetCreateGroupState } from "./resetCreateGroupState";
import { selectUser } from "./selectUser";
import { unSelectUser } from "./unSelectUser";

export const createGroupReducers = {
    addUsers: addUsers,
    selectUser: selectUser,
    unSelectUser: unSelectUser,
    resetCreateGroupState: resetCreateGroupState,
};
