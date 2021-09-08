import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserChatMatesThunk } from "../redux/auth/thunks/setUserChatMatesThunk";
import { setUserThunk } from "../redux/auth/thunks/setUserThunk";

export const useSetUser = (authToken: string) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (authToken) {
            dispatch(setUserThunk());
            dispatch(setUserChatMatesThunk());
        }
    }, [authToken]);
};
