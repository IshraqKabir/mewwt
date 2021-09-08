import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../app/redux/auth/selectors/authSelector";
import { getChatListThunk } from "../../../app/redux/chatList/thunks/getChatListThunk";
import { IRoomChip } from "../../../app/types/IRoomChip";
import { RoomChip } from "../RoomChip/RoomChip";

interface IProps {
    roomChips: IRoomChip[];
    isLoading: boolean;
    handlePress: (room_id: number) => void;
}

export const RoomChipList = ({ roomChips, isLoading, handlePress }: IProps) => {
    const dispatch = useDispatch();

    const { user, chatMates } = useSelector(authSelector);

    useEffect(() => {
        dispatch(getChatListThunk());
    }, []);

    return (
        <View>
            {roomChips.length ? (
                <FlatList
                    data={roomChips}
                    keyExtractor={(roomChip) => roomChip.room_id}
                    renderItem={({ item: roomChip }: { item: IRoomChip }) => {
                        return (
                            <RoomChip
                                key={roomChip.room_id}
                                roomChip={roomChip}
                                handlePress={handlePress}
                                authUserId={user?.id}
                                chatMates={chatMates}
                            />
                        );
                    }}
                />
            ) : null}
        </View>
    );
};
