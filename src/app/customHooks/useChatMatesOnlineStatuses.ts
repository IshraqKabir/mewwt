import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/auth/selectors/authSelector";
import { setChatMatesOnlineStatusesThunk } from "../redux/auth/thunks/setChatMatesOnlineStatusesThunk";
import { IChatMate } from "../types/IChatMate";
import { pluck } from "../utils/pluck";

export const useChatMatesOnlineStatuses = () => {
    const { chatMates } = useSelector(authSelector, (next, prev) => {
        return next.chatMates?.length === prev.chatMates?.length;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (chatMates.length > 0) {
            dispatch(
                setChatMatesOnlineStatusesThunk(
                    pluck<IChatMate>(
                        chatMates.filter((chatMate) => {
                            return !chatMate.onlineStatus;
                        }),
                        "id"
                    )
                )
            );
        }
    }, [chatMates.length]);
};
