import { addMessage } from "./addMessage";
import { incrementPage } from "./incrementPage";
import { initRoom } from "./initRoom";
import { readMessages } from "./readMessages";
import { setReplyTo } from "./setReplyTo";
import { setShouldScrollToMessageId } from "./setShouldScrollToMessageId";
import { setUnreadMessagesCount } from "./setUnreadMessagesCount";
import { userJoined } from "./userJoined";
import { userLeft } from "./userLeft";
import { userStartedTyping } from "./userStartedTyping";
import { userStoppedTyping } from "./userStoppedTyping";

export const roomsReducers = {
    initRoom: initRoom,
    addMessage: addMessage,
    incrementPage: incrementPage,
    readMessages: readMessages,
    setUnreadMessagesCount: setUnreadMessagesCount,
    userJoined: userJoined,
    userLeft: userLeft,
    userStartedTyping: userStartedTyping,
    userStoppedTyping: userStoppedTyping,
    setReplyTo: setReplyTo,
    setShouldScrollToMessageId: setShouldScrollToMessageId,
};
