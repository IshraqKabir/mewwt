import { NavigationProp } from "@react-navigation/core";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NewMessageIcon } from "../../../assets/icons/NewMessageIcon/NewMessageIcon";
import { DP_WIDTH } from "../../../consts";

const DP = require("../../../assets/images/default_dp.jpg");

interface IProps {
    routeName: string;
    navigation: NavigationProp<any, any>;
}

export const ChatListTopbar = ({ routeName, navigation }: IProps) => {
    const handleNewMessagePress = () => {
        navigation.navigate("new_message", {
            screen: "new_message",
        });
    };

    return (
        <View style={styles.container}>
            <Image source={DP} style={styles.dp} />
            <Text style={styles.header}>{routeName}</Text>
            <View style={styles.iconsContainer}>
                <NewMessageIcon
                    handlePress={() => {
                        handleNewMessagePress();
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        elevation: 5,
    },
    dp: {
        height: DP_WIDTH,
        width: DP_WIDTH,
        borderRadius: DP_WIDTH / 2,
    },
    header: {
        marginLeft: 10,
        textTransform: "capitalize",
        fontWeight: "bold",
        fontSize: 28,
    },
    iconsContainer: {
        marginLeft: "auto",
    },
});
