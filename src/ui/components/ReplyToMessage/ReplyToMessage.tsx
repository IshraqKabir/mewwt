import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IReplyTo } from "../../../app/types/IReplyTo";

interface IProps {
    replyTo: IReplyTo;
    authUserId: number;
    fromSelf: boolean;
}

export const ReplyToMessage = ({ replyTo, fromSelf }: IProps) => {
    return <View style={[styles.container, {
        // alignSelf: !fromSelf ? "flex-end" : "flex-start",
        transform: [
            {
                translateX: 10 * (!fromSelf ? 1 : -1),
            },
            {
                translateY: 30
            }
        ]
    }]}>
        <Text>
            {replyTo.reply_to_message_text}
        </Text>
    </View>;

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgray",
        padding: 15,
        paddingBottom: 40,
        borderRadius: 15,
        marginTop: -30,
    }
});
