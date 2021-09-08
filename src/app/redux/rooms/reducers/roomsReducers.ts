import { addUser } from "./addMessage";
import { incrementPage } from "./incrementPage";
import { initRoom } from "./initRoom";
import { readMessages } from "./readMessages";
import { setUnreadMessagesCount } from "./setUnreadMessagesCount";

export const roomsReducers = {
    initRoom: initRoom,
    addMessage: addUser,
    incrementPage: incrementPage,
    readMessages: readMessages,
    setUnreadMessagesCount: setUnreadMessagesCount,
};
