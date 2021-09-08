import React from "react";
import { useState } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Text, Image } from "react-native";
import { IUser } from "../../../app/types/IUser";
import { DP_WIDTH } from "../../../consts";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useEffect } from "react";

const DP = require("../../../assets/images/default_dp.jpg");

interface IProps {
    user: IUser;
    handleSelect: (user: IUser) => void;
    handleUnSelect: (user: IUser) => void;
    isChecked: boolean;
}

export const UserChipWithCheckbox = ({
    user,
    handleSelect,
    handleUnSelect,
    isChecked,
}: IProps) => {
    let bouncyCheckboxRef: BouncyCheckbox | null = null;

    const handlePress = () => {
        if (isChecked) {
            handleUnSelect(user);
        } else {
            handleSelect(user);
        }
    };

    return (
        <Pressable
            style={styles.container}
            onPress={() => bouncyCheckboxRef?.onPress()}
        >
            <Image source={DP} style={styles.dp} />
            <Text
                style={styles.name}
                numberOfLines={1}
                ellipsizeMode="tail"
            >{`${user.first_name} ${user.last_name}`}</Text>
            <BouncyCheckbox
                size={20}
                fillColor="#4187f5"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: isChecked ? "#4187f5" : "gray" }}
                ref={(ref: any) => (bouncyCheckboxRef = ref)}
                isChecked={isChecked}
                disableBuiltInState
                onPress={handlePress}
                style={{
                    marginLeft: "auto",
                    marginRight: -10,
                }}
            />
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
        color: "#000",
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
