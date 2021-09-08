import React from "react";
import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Text, Image } from "react-native";
import { IUser } from "../../../app/types/IUser";
import { DP_WIDTH } from "../../../consts";

const DP = require("../../../assets/images/default_dp.jpg");

interface IProps {
    user: IUser;
    handlePress: (user: IUser, enable: Function) => void;
    shouldDisableAfterPress?: boolean;
}

export const UserChip = ({
    user,
    handlePress,
    shouldDisableAfterPress = true,
}: IProps) => {
    const [disabled, setDisabled] = useState(false);

    const enable = () => {
        setDisabled(false);
    };

    const disable = () => {
        if (shouldDisableAfterPress) setDisabled(true);
    };

    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                if (disabled) {
                    return;
                }

                disable();
                handlePress(user, enable);
            }}
        >
            <Image source={DP} style={styles.dp} />
            <Text
                style={{
                    ...styles.name,
                    ...{
                        color: disabled ? "lightgray" : "#000000",
                    },
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
            >{`${user.first_name} ${user.last_name}`}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    name: {
        fontSize: 17,
        fontWeight: "700",
        textTransform: "capitalize",
        marginLeft: 10,
    },
    dp: {
        height: DP_WIDTH,
        width: DP_WIDTH,
        borderRadius: DP_WIDTH / 2,
    },
});
