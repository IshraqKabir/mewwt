import { NavigationProp } from "@react-navigation/core";
import { Dispatch } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/auth/selectors/authSelector";
import { roomChipRead } from "../redux/chatList/chatListActions";
import { chatListSelector } from "../redux/chatList/selectors/chatListSelector";

export const useRoomChipList = (
    navigation: NavigationProp<any, any>,
    dispatch: Dispatch<any>
) => {
    const { roomChips, isLoading } = useSelector(chatListSelector);

    const { user, chatMates } = useSelector(authSelector);

    const handlePress = (room_id: number) => {
        dispatch(
            roomChipRead({
                room_id: room_id,
                authUserId: user?.id ?? 0,
                reader_id: user?.id ?? 0,
            })
        );
        navigation.navigate("room", {
            room_id: room_id,
        });
    };

    return { user, roomChips, isLoading, handlePress, chatMates };
};
