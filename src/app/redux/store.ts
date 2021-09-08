import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import thunk from "redux-thunk";
import { combinedReducers } from "./combinedReducers";

export const store = configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(thunk);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
