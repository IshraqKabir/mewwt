import { IUser } from "../../types/IUser";

export interface ICreateGroupState {
    users: IUser[];
    selectedUsers: IUser[];
}
