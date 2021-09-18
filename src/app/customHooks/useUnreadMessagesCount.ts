import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../redux/auth/selectors/authSelector";
import { chatListSelector } from "../redux/chatList/selectors/chatListSelector";
import { setUnreadMessagesCount } from "../redux/rooms/roomsActions";
import { getIsRoomChipRead } from "../utils/getIsRoomChipRead";

export const useUnreadMessagesCount = () => {
    const { user } = useSelector(authSelector, (next, prev) => {
        if (next.user?.id !== prev.user?.id) {
            return false;
        }

        return true;
    });

    const { roomChips } = useSelector(chatListSelector, (next, prev) => {
        return prev.roomChips.length !== 0;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        let chatsUnreadCount = 0;
        let groupsUnreadCount = 0;

        roomChips.forEach((roomChip) => {
            if (!getIsRoomChipRead(roomChip, user?.id)) {
                roomChip.is_group ? groupsUnreadCount++ : chatsUnreadCount++;
            }
        });

        dispatch(
            setUnreadMessagesCount({
                chats: chatsUnreadCount,
                groups: groupsUnreadCount,
            })
        );

        // console.log(`${user?.first_name} chatsUnreadCOunt`, chatsUnreadCount);
        // console.log(`${user?.first_name} groupsUnread`, groupsUnreadCount);
    }, [roomChips]);
};
