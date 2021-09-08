import { NavigationProp } from "@react-navigation/core";
import React from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Bottombar } from "./Bottombar/Bottombar";
import { MessageList } from "./MessageList/MessageList";
import { RoomTopbar } from "./RoomTopbar/RoomTopbar";
import { useRoom } from "./useRoom";

interface IProps {
    roomId: number;
    navigation: NavigationProp<any, any>;
}

export const Room = ({ roomId, navigation }: IProps) => {
    const { isInvalid, name, messages, users, is_group, status } =
        useRoom(roomId);

    if (isInvalid) {
        return (
            <View style={styles.container}>
                <Text>Invalid room</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <RoomTopbar
                roomId={roomId}
                roomName={name}
                is_group={is_group}
                status={status}
                navigation={navigation}
            />
            {messages ? (
                <MessageList roomId={roomId} messages={messages} />
            ) : null}

            <Bottombar roomId={roomId} users={users} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});
