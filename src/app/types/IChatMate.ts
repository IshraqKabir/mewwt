import { IUser } from "./IUser";
import { IUserOnlineStatus } from "./IUserOnlineStatus";

export type IChatMate = IUser & {
    onlineStatus?: IUserOnlineStatus;
};
