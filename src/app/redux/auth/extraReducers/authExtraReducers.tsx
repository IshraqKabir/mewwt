import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { setToken } from "../../../repository/storage/setToken";
import { loginThunk } from "../thunks/loginThunk";
import { registerThunk } from "../thunks/registerThunk";
import { setChatMatesOnlineStatusesThunk } from "../thunks/setChatMatesOnlineStatusesThunk";
import { setTokenThunk } from "../thunks/setTokenThunk";
import { setUserChatMatesThunk } from "../thunks/setUserChatMatesThunk";
import { setUserThunk } from "../thunks/setUserThunk";
import { IAuthState } from "../types";

export const AuthExtraReducers = (
    builder: ActionReducerMapBuilder<IAuthState>
) => {
    // login
    builder.addCase(loginThunk.pending, (state: IAuthState) => {
        state.login.state = "pending";
    });

    builder.addCase(loginThunk.fulfilled, (state: IAuthState, { payload }) => {
        const user = payload.data;
        const token = user ? user.authToken : "";

        state.login.state = "fulfilled";
        state.user = user ? user : null;
        state.authToken = token ?? "";
        state.login.errors = payload.errors ? payload.errors : [];

        // store token in local storage
        setToken(token ?? "");
    });

    builder.addCase(loginThunk.rejected, (state: IAuthState, { payload }) => {
        state.login.state = "rejected";
    });

    // register
    builder.addCase(registerThunk.pending, (state: IAuthState) => {
        state.register.state = "pending";
    });

    builder.addCase(
        registerThunk.fulfilled,
        (state: IAuthState, { payload }) => {
            const user = payload.data;
            const token = user ? user.authToken : "";

            state.register.state = "fulfilled";
            state.user = user ? user : null;
            state.authToken = token ?? "";
            state.register.errors = payload.errors ? payload.errors : [];

            // store token in local storage
            setToken(token ?? "");
        }
    );

    builder.addCase(
        registerThunk.rejected,
        (state: IAuthState, { payload }) => {
            state.register.state = "rejected";
        }
    );

    // token
    builder.addCase(
        setTokenThunk.fulfilled,
        (state: IAuthState, { payload }) => {
            state.authToken = payload;
        }
    );

    // get user
    builder.addCase(
        setUserThunk.fulfilled,
        (state: IAuthState, { payload }) => {
            state.user = payload;
        }
    );

    // chat mates
    builder.addCase(
        setUserChatMatesThunk.fulfilled,
        (state: IAuthState, { payload: chatMates }) => {
            state.chatMates = chatMates;
        }
    );

    // chat mates online statuses
    builder.addCase(
        setChatMatesOnlineStatusesThunk.fulfilled,
        (state: IAuthState, { payload: chatMatesOnlineStatuses }) => {
            state.chatMates = state.chatMates.map((chatMate) => {
                if (!chatMatesOnlineStatuses[chatMate.id]) {
                    return chatMate;
                }

                return {
                    ...chatMate,
                    onlineStatus: { ...chatMatesOnlineStatuses[chatMate.id] },
                };
            });
        }
    );
};
