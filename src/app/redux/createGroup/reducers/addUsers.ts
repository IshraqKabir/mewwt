import { IUser } from "../../../types/IUser";
import { ICreateGroupState } from "../types";

export const addUsers = (
    state: ICreateGroupState,
    { payload }: { payload: IUser[] }
) => {
    state.users = [...payload, ...state.users];
};
