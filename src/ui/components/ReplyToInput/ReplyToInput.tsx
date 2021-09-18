import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { capitalizeFirstLetter } from "../../../app/utils/capitalizeFirstLetter";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { setReplyTo } from "../../../app/redux/rooms/roomsActions";
import { IReplyTo } from "../../../app/types/IReplyTo";

interface IProps {
    replyTo: IReplyTo;
    roomId: number;
}

export const ReplyToInput = ({ replyTo, roomId }: IProps) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setReplyTo({ replyTo: null, roomId: roomId }));
    };

    return <View style={[styles.container]}>
        <Text style={{ fontSize: 12, }}>
            <Text>Replying To: </Text>
            <Text style={{ fontWeight: "bold" }}>
                {`${capitalizeFirstLetter(replyTo.reply_to_message_sender_first_name)} ${capitalizeFirstLetter(replyTo.reply_to_message_sender_last_name)}`}
            </Text>
        </Text>
        {replyTo && replyTo.reply_to_message_text && (
            <Text
                style={{
                    fontSize: 10,
                    marginTop: 5,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {`${replyTo.reply_to_message_text.slice(0, 40)}${replyTo.reply_to_message_text?.length > 40 ? "..." : ""}`}
            </Text>
        )}
        <Pressable
            hitSlop={10}
            style={{
                position: "absolute",
                right: 10,
                top: 5,
                height: "100%",
                justifyContent: "center"
            }}
            onPress={handleClose}
        >
            <Icon name="close-circle" size={15} />
        </Pressable>
    </View>;
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: "lightblue"
    }
});
