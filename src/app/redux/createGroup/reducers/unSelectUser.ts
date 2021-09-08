import { IUser } from "../../../types/IUser";
import { ICreateGroupState } from "../types";

export const unSelectUser = (
    state: ICreateGroupState,
    { payload }: { payload: IUser }
) => {
    state.selectedUsers = state.selectedUsers.filter(
        (user) => user.id !== payload.id
    );
};
