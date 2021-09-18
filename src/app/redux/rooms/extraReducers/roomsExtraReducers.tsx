import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { IMessage } from "../../../types/IMessage";
import { arrayToHash } from "../../../utils/arrayToHash";
import { pluck } from "../../../utils/pluck";
import { addMessage } from "../reducers/addMessage";
import { getRoomDetailsThunk } from "../thunks/getRoomDetailsThunk";
import { getRoomMessagesThunk } from "../thunks/getRoomMessagesThunk";
import { getRoomMessagesWithRangeThunk } from "../thunks/getRoomMessagesWithRangeThunk";
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
                if (room.id !== payload.id) {
                    return room;
                }

                const prevMessages = room.messages ? [...room.messages] : [];
                let newMessages = payload.messages ? [...payload.messages] : [];

                const prevMessagesHash = arrayToHash<IMessage>(prevMessages, "id");

                newMessages = newMessages.filter(message => {
                    return !prevMessagesHash[`${message.id ?? 0}`];
                });

                return {
                    ...room,
                    ...payload,
                    messages: [...newMessages, ...prevMessages]
                };
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

                const prevMessages = room.messages ? [...room.messages] : [];
                let newMessages = messages ? [...messages] : [];
                const prevMessagesHash = arrayToHash<IMessage>(prevMessages, "id");

                newMessages = newMessages.filter(message => {
                    return !prevMessagesHash[`${message.id ?? 0}`];
                });

                return {
                    ...room,
                    messages: [...prevMessages, ...newMessages],
                    isFetchingNewMessages: false,
                };
            });
        }
    );

    builder.addCase(getRoomMessagesWithRangeThunk.pending, (state, { meta: { arg: { roomId } } }) => {
        state.rooms = state.rooms.map(room => {
            if (room.id !== roomId) {
                return room;
            }

            return {
                ...room,
                isFetchingNewMessages: true,
            };
        });
    });

    builder.addCase(getRoomMessagesWithRangeThunk.fulfilled, (state: IRoomsState, { meta: { arg: { roomId, start, end } }, payload: messages }) => {
        state.rooms = state.rooms.map(room => {
            if (room.id !== roomId) {
                return room;
            }

            const prevMessages = room.messages ? [...room.messages] : [];
            let newMessages = messages ? [...messages] : [];

            const prevMessagesHash = arrayToHash<IMessage>(prevMessages, "id");

            newMessages = newMessages.filter(message => {
                return !prevMessagesHash[`${message.id}`];
            });

            const allMessages = [...prevMessages, ...newMessages];

            const pageNumber = Math.ceil((allMessages.length ?? 0) / 20);

            return {
                ...room,
                isFetchingNewMessages: false,
                messagesPageNumber: pageNumber,
                messages: allMessages,
            };
        });
    });
};
