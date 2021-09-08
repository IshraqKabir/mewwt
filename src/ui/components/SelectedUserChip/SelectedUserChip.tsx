import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Text, Image } from "react-native";
import { IUser } from "../../../app/types/IUser";
import { DP_WIDTH } from "../../../consts";
import Icon from "react-native-vector-icons/AntDesign";

const DP = require("../../../assets/images/default_dp.jpg");

interface IProps {
    user: IUser;
    handleRemove: (user: IUser) => void;
}

export const SelectedUserChip = ({ user, handleRemove }: IProps) => {
    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                handleRemove(user);
            }}
        >
            <Image source={DP} style={styles.dp} />
            <Text
                style={{
                    ...styles.name,
                    ...{
                        color: "#000000",
                    },
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
            >{`${user.first_name} ${user.last_name}`}</Text>
            <View style={styles.closeIconContainer}>
                <Icon name="closecircle" size={25} style={{ color: "red" }} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        alignItems: "center",
        position: "relative",
        maxWidth: 100,
        marginRight: 10,
    },
    name: {
        fontSize: 12,
        textTransform: "capitalize",
        marginLeft: 10,
    },
    dp: {
        height: DP_WIDTH,
        width: DP_WIDTH,
        borderRadius: DP_WIDTH / 2,
        marginBottom: 5,
    },
    closeIconContainer: {
        position: "absolute",
        top: 0,
        right: 5,
    },
});
