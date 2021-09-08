import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { chatListSlice } from "./chatList/chatListSlice";
import { createGroupSlice } from "./createGroup/createGroupSlice";
import { newMessageSlice } from "./newMessage/newMessageSlice";
import { roomsSlice } from "./rooms/roomsSlice";

export const combinedReducers = combineReducers({
    auth: authSlice.reducer,
    newMessage: newMessageSlice.reducer,
    rooms: roomsSlice.reducer,
    chatList: chatListSlice.reducer,
    createGroup: createGroupSlice.reducer,
});
