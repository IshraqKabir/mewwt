import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { IMessage } from "../../../app/types/IMessage";
import { capitalizeFirstLetter } from "../../../app/utils/capitalizeFirstLetter";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { setReplyTo } from "../../../app/redux/rooms/roomsActions";

interface IProps {
    message: IMessage;
}

export const ReplyTo = ({ message }: IProps) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setReplyTo({ message: null, roomId: message.room_id }));
    };

    return <View style={[styles.container]}>
        <Text style={{ fontSize: 12, }}>
            <Text>Replying To: </Text>
            <Text style={{ fontWeight: "bold" }}>{`${capitalizeFirstLetter(message.sender_first_name)} ${capitalizeFirstLetter(message.sender_last_name)}`}</Text>
        </Text>
        <Text style={{ fontSize: 10, marginTop: 5, }} numberOfLines={1}>
            {`${message.text.slice(0, 40)}${message.text.length > 40 ? "..." : ""}`}
        </Text>
        <Pressable
            hitSlop={10}
            style={{
                position: "absolute",
                right: 5,
                top: 5,
                height: "100%",
                justifyContent: "center"
            }}
            onPress={() => {
                handleClose();
            }}
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
