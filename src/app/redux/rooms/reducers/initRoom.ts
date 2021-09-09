import { PayloadAction } from "@reduxjs/toolkit";
import { IRoom } from "../../../types/IRoom";
import { IRoomsState } from "../types";

export const initRoom = (state: IRoomsState, action: PayloadAction<number>) => {
    state.rooms.push({
        id: action.payload,
        messagesPageNumber: 1,
        messagesHasNext: true,
        isFetchingNewMessages: false,
        roomPresences: [],
        is_group: false,
        messages: [],
        name: "",
        users: []
    } as IRoom);
};
