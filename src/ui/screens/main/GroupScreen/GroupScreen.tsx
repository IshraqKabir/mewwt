import { NavigationProp } from "@react-navigation/core";
import React from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useRoomChipList } from "../../../../app/customHooks/useRoomChipList";
import { logout } from "../../../../app/redux/auth/authActions";
import { BACKGROUND_COLOR } from "../../../../consts";
import { RoomChipList } from "../../../components/RoomChipList/RoomChipList";

interface IProps {
    navigation: NavigationProp<any, any>;
}

export const GroupsScreen = ({ navigation }: IProps) => {
    const dispatch = useDispatch();

    const { user, roomChips, isLoading, handlePress } = useRoomChipList(
        navigation,
        dispatch
    );

    return (
        <View style={styles.container}>
            <Pressable onPress={() => dispatch(logout())}>
                <Text style={{ marginVertical: 20, alignSelf: "center" }}>
                    Logout
                </Text>
            </Pressable>
            {user ? (
                <>
                    <RoomChipList
                        roomChips={roomChips.filter(
                            (roomChip) => roomChip.is_group
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
