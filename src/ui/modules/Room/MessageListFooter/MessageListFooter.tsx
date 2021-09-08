import React from "react";
import { Text, View } from "react-native";

interface IProps {
    show: boolean;
}

export const MessageListFooter = ({ show }: IProps) => {
    return (
        <View>
            {show ? (
                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                    Loading More Messages...
                </Text>
            ) : (
                <Text></Text>
            )}
        </View>
    );
};
