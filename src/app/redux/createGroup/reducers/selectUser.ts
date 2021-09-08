import { IUser } from "../../../types/IUser";
import { ICreateGroupState } from "../types";

export const selectUser = (
    state: ICreateGroupState,
    { payload }: { payload: IUser }
) => {
    state.selectedUsers = [...state.selectedUsers, payload];
};
