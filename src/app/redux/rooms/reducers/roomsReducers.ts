import { addUser } from "./addMessage";
import { incrementPage } from "./incrementPage";
import { initRoom } from "./initRoom";
import { readMessages } from "./readMessages";
import { setUnreadMessagesCount } from "./setUnreadMessagesCount";
import { userJoined } from "./userJoined";
import { userLeft } from "./userLeft";

export const roomsReducers = {
    initRoom: initRoom,
    addMessage: addUser,
    incrementPage: incrementPage,
    readMessages: readMessages,
    setUnreadMessagesCount: setUnreadMessagesCount,
    userJoined: userJoined,
    userLeft: userLeft,
};
