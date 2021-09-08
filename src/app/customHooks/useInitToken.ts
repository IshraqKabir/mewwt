import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokenThunk } from "../redux/auth/thunks/setTokenThunk";

export const useInitToken = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTokenThunk());
    }, []);
};
