import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { addMessage } from "../reducers/addMessage";
import { getRoomDetailsThunk } from "../thunks/getRoomDetailsThunk";
import { getRoomMessagesThunk } from "../thunks/getRoomMessagesThunk";
import { sendMessageThunk } from "../thunks/sendMessageThunk";
import { IRoomsState } from "../types";

export const roomsExtraReducers = (
    builder: ActionReducerMapBuilder<IRoomsState>
) => {
    builder.addCase(
        getRoomDetailsThunk.fulfilled,
        (state: IRoomsState, { payload }) => {
            if (!payload) {
                return;
            }

            state.rooms = state.rooms.map((room) => {
                if (room.id == payload.id) {
                    return {
                        ...room,
                        ...payload,
                    };
                }

                return room;
            });
        }
    );

    // send message
    builder.addCase(sendMessageThunk.fulfilled, addMessage);

    // get room messages
    builder.addCase(
        getRoomMessagesThunk.pending,
        (state: IRoomsState, { meta }) => {
            const { roomId } = meta.arg;

            state.rooms = state.rooms.map((room) => {
                if (room.id !== roomId) {
                    return room;
                }

                return {
                    ...room,
                    isFetchingNewMessages: true,
                };
            });
        }
    );

    builder.addCase(
        getRoomMessagesThunk.fulfilled,
        (state: IRoomsState, { payload: { roomId, messages } }) => {
            if (messages.length === 0) {
                state.rooms = state.rooms.map((room) => {
                    if (room.id !== roomId) return room;

                    return {
                        ...room,
                        messagesHasNext: false,
                        isFetchingNewMessages: false,
                    };
                });
                return;
            }

            state.rooms = state.rooms.map((room) => {
                if (room.id !== roomId) return room;

                return {
                    ...room,
                    messages: [...room.messages, ...messages],
                    isFetchingNewMessages: false,
                };
            });
        }
    );
};
