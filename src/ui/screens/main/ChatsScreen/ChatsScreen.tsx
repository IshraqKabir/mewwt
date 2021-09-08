import React from "react";
import { NavigationProp } from "@react-navigation/core";
import { Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useRoomChipList } from "../../../../app/customHooks/useRoomChipList";
import { BACKGROUND_COLOR } from "../../../../consts";
import { RoomChipList } from "../../../components/RoomChipList/RoomChipList";

interface IProps {
    navigation: NavigationProp<any, any>;
}

export const ChatsScreen = ({ navigation }: IProps) => {
    const dispatch = useDispatch();

    const { user, roomChips, isLoading, handlePress } = useRoomChipList(
        navigation,
        dispatch
    );

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            margin: 15,
                            textTransform: "capitalize",
                        }}
                    >
                        {user.id}.{user.first_name} {user.last_name}
                    </Text>
                    <RoomChipList
                        roomChips={roomChips.filter(
                            (roomChip) => !roomChip.is_group
                        )}
                        isLoading={isLoading}
                        handlePress={handlePress}
                    />
                </>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND_COLOR,
        height: "100%",
    },
});
