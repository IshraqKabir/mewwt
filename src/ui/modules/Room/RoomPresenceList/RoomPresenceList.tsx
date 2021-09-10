import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../app/redux/auth/selectors/authSelector";
import { singleRoomSelector } from "../../../../app/redux/rooms/selectors/singleRoomSelector";
import { RootState } from "../../../../app/redux/store";
import { IRoomPresence } from "../../../../app/types/IRoomPresence";
import { BACKGROUND_COLOR } from "../../../../consts";

interface IProps {
    roomPresences: IRoomPresence[];
    roomId: number;
}

export const RoomPresenceList = ({ roomPresences, roomId }: IProps) => {
    const { user: currentUser, chatMates } = useSelector(authSelector);
    const { users: roomUsers, } = useSelector(
        (state: RootState) => {
            return singleRoomSelector(state, roomId);
        }
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={roomPresences.filter(roomPresence => roomPresence.userId !== currentUser?.id && roomPresence.isPresent)}
                keyExtractor={(roomPresence) => roomPresence.userId}
                renderItem={({ item: roomPresence, index }: { item: IRoomPresence, index: number; }) => {
                    const user = roomUsers?.find(roomUser => roomUser.id === roomPresence.userId);

                    return (
                        <Text>{user?.first_name}{roomPresence.isTyping ? " : typing" : ""}</Text>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND_COLOR,
    },
});
