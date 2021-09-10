import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { sendMessageThunk } from "../../../../app/redux/rooms/thunks/sendMessageThunk";
import { IMessage } from "../../../../app/types/IMessage";
import { IUser } from "../../../../app/types/IUser";
import { BACKGROUND_COLOR, BLUE_COLOR, GRAY_COLOR } from "../../../../consts";
import { SendIcon } from "./SendIcon/SendIcon";
import { useMessage } from "./useMessage";

interface IProps {
    roomId: number;
    users: IUser[] | undefined;
    roomSocket: Socket | null;
}

export const Bottombar = ({ roomId, users, roomSocket }: IProps) => {
    const { text, handleSend, handleTextChange } = useMessage(roomId, roomSocket);

    return <View style={styles.container}>
        <View style={styles.textInputContainer}>
            <TextInput
                style={styles.textInput}
                value={text}
                onChangeText={text => handleTextChange(text)}
                placeholder="Message"
                placeholderTextColor={GRAY_COLOR}
                selectionColor={BLUE_COLOR}
                multiline={true}
            />
        </View>
        <View style={styles.sendIconContainer}>
            <SendIcon
                isDisabled={text === "" || text.length > 1000}
                handlePress={handleSend}
            />
        </View>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
        width: "100%",
        backgroundColor: BACKGROUND_COLOR,
    },
    textInputContainer: {
        width: "88%",
    },
    textInput: {
        borderColor: GRAY_COLOR,
        borderWidth: 1,
        borderRadius: 20,
        width: "100%",
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: "#000000",
        backgroundColor: "white",
    },
    sendIconContainer: {}
});
