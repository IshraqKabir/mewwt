import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BackIcon } from "../../../../assets/icons/BackIcon/BackIcon";
import { createRoom } from "../../../../app/repository/room/createRoom";
import { useDispatch, useSelector } from "react-redux";
import { createGroupSelector } from "../../../../app/redux/createGroup/selectors/createGroupSelector";
import { pluck } from "../../../../app/utils/pluck";
import { useState } from "react";
import { resetCreateGroupState } from "../../../../app/redux/createGroup/createGroupActions";
import { useBackHandler } from "../../../customHooks/useBackHandler";
import { INavContext } from "../../../../app/types/INavContext";
import { NewNameGroupNavigationContext } from "../../../contexts/NewNameGroupNavigationContext";

interface IProps {
    name: string;
}

export const Header = ({ name }: IProps) => {
    const { selectedUsers } = useSelector(createGroupSelector);
    const dispatch = useDispatch();
    const { canGoBack, goBack } = useNavigation();
    const [notLoading, setNotLoading] = useState(true);

    const { navigation } = useContext(
        NewNameGroupNavigationContext
    ) as INavContext;

    const handleBack = () => {
        if (canGoBack() && notLoading) {
            goBack();
        }
    };

    useBackHandler(handleBack);

    const handleConfirm = async () => {
        if (!notLoading) return;

        setNotLoading(false);
        const roomId = await createRoom(pluck(selectedUsers, "id"), name, true);

        if (!roomId) {
            // console.log("something went wrong");
        }

        resetState();

        navigation.navigate("room", {
            room_id: roomId,
        });
    };

    const resetState = () => {
        dispatch(resetCreateGroupState());
    };

    return (
        <View style={styles.container}>
            <View>
                <BackIcon fill="#000" handlePress={handleBack} />
            </View>
            <Text style={styles.header}>New Group</Text>
            {name.length > 0 && notLoading ? (
                <Pressable
                    onPress={handleConfirm}
                    style={{ position: "absolute", top: 0, right: 0 }}
                >
                    <Text
                        style={{
                            ...styles.next,
                            color: "#000",
                        }}
                    >
                        Confirm
                    </Text>
                </Pressable>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        marginVertical: 20,
        marginHorizontal: 15,
    },
    header: {
        fontWeight: "700",
        fontSize: 18,
        marginLeft: "auto",
        marginRight: "auto",
    },
    cancelContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        textAlignVertical: "center",
        height: "100%",
    },
    next: {
        fontSize: 15,
    },
});
