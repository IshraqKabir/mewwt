import React, { memo } from "react";
import { View, Text } from "react-native";
import { IMessage } from "../../../app/types/IMessage";

interface IProps {
    message: IMessage;
}

export const SimpleMessage = memo(({ message }: IProps) => {
    return <View style={{ padding: 25 }}>
        <Text style={{ color: "black" }}>{message.id}</Text>
    </View>;
}, () => {
    return true;
});
