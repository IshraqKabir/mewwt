import { NavigationProp } from "@react-navigation/core";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BackIcon } from "../../../../assets/icons/BackIcon/BackIcon";
import { BACKGROUND_COLOR, DP_WIDTH } from "../../../../consts";
import { useBackHandler } from "../../../customHooks/useBackHandler";

const DP = require("../../../../assets/images/default_dp.jpg");

interface IProps {
    roomId: number;
    roomName: string;
    is_group: boolean;
    status: string;
    navigation: NavigationProp<any, any>;
}

export const RoomTopbar = ({
    roomId,
    roomName,
    is_group,
    navigation,
    status,
}: IProps) => {
    const handleBack = () => {
        const state =
            navigation.getState().routes[navigation.getState().index - 1]
                ?.state;
        const prevRouteName = state?.routes[state.index ?? 0].name;

        navigation.navigate("chats_tabs", {
            screen:
                is_group === undefined
                    ? prevRouteName ?? "chats"
                    : is_group
                    ? "groups"
                    : "chats",
        });
    };

    useBackHandler(handleBack);

    return (
        <View style={styles.container}>
            <BackIcon fill="#0584FE" handlePress={handleBack} />
            <Image source={DP} style={styles.dp} />
            <View style={styles.userContainer}>
                <Text
                    style={styles.name}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {roomName}
                </Text>
                <Text style={styles.status}>{status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: BACKGROUND_COLOR,
    },
    dp: {
        height: DP_WIDTH,
        width: DP_WIDTH,
        borderRadius: DP_WIDTH / 2,
        marginLeft: 20,
    },
    userContainer: {
        justifyContent: "flex-start",
        marginLeft: 10,
        width: "50%",
    },
    name: {
        textTransform: "capitalize",
        fontSize: 16,
    },
    status: {
        fontSize: 12,
        textTransform: "capitalize",
    },
});
