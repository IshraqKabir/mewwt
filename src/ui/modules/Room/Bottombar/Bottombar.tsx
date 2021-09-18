import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { singleRoomSelector } from "../../../../app/redux/rooms/selectors/singleRoomSelector";
import { RootState } from "../../../../app/redux/store";
import { BACKGROUND_COLOR, BLUE_COLOR, GRAY_COLOR } from "../../../../consts";
import { ReplyToInput } from "../../../components/ReplyToInput/ReplyToInput";
import { SendIcon } from "./SendIcon/SendIcon";
import { useSendMessage } from "./useSendMessage";

interface IProps {
    roomId: number;
    roomSocket: Socket | null;
}

export const Bottombar = ({ roomId, roomSocket }: IProps) => {
    const { replyTo, users } = useSelector((state: RootState) => {
        return singleRoomSelector(state, roomId);
    }, (next, prev) => {
        if (next.replyTo?.reply_to_message_id !== prev.replyTo?.reply_to_message_id) {
            return false;
        }

        return true;
    });

    const { text, handleSend, handleTextChange, textInputRef } = useSendMessage(roomId, roomSocket, users ?? [], replyTo);

    return (
        <>
            {replyTo ?
                <ReplyToInput replyTo={replyTo} roomId={roomId} />
                : null}
            <View style={styles.container}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={text}
                        onChangeText={text => handleTextChange(text)}
                        placeholder="Message"
                        placeholderTextColor={GRAY_COLOR}
                        selectionColor={BLUE_COLOR}
                        multiline={true}
                        focusable={false}
                        ref={(item) => {
                            if (item) {
                                textInputRef.current = item;
                            }
                        }}
                    />
                </View>
                <View style={styles.sendIconContainer}>
                    <SendIcon
                        isDisabled={text === "" || text.length > 1000}
                        handlePress={handleSend}
                    />
                </View>
            </View>
        </>);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        paddingTop: 0,
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
