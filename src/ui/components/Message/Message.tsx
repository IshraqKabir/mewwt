import React from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { IMessage } from "../../../app/types/IMessage";
import { SeenIcon } from "../../../assets/icons/SeenIcon/SeenIcon";
import { SentIcon } from "../../../assets/icons/SentIcon/SentIcon";
import { BLUE_COLOR, DP_WIDTH, LIGHT_GRAY_COLOR } from "../../../consts";
import { ReplyToMessage } from "../ReplyToMessage/ReplyToMessage";
import { useMessageReply } from "./useMessageReply";

const DP = require("../../../assets/images/default_dp.jpg");

interface IProps {
    message: IMessage;
    hasNextFromSameSender: boolean;
    hasPrevFromSameSender: boolean;
    showSenderName: boolean;
    isUserOnline: boolean;
    authUserId: number;
}

// has prev means down
// has next means up

export const Message = ({
    message,
    hasNextFromSameSender,
    hasPrevFromSameSender,
    showSenderName,
    isUserOnline,
    authUserId
}: IProps) => {
    const { animatedStyles: messageReplyAnimatedStyles, gestureHandler } = useMessageReply(message);

    // if (message.id === 164)
    //     console.log(`${message.id}: ${message.text} has rerendered`);

    return (
        <View>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[{
                        ...styles.container,
                        alignSelf: message.fromSelf ? "flex-end" : "flex-start",
                        flexDirection: message.fromSelf ? "row-reverse" : "row",
                        marginBottom: !hasPrevFromSameSender ? 15 : 1,
                    }, messageReplyAnimatedStyles]}
                >
                    {!message.fromSelf ? (
                        <View style={styles.dpContainer}>
                            {!hasPrevFromSameSender ? (
                                <Image
                                    source={DP}
                                    style={{
                                        ...styles.dp,
                                        borderColor: isUserOnline
                                            ? "green"
                                            : "transparent",
                                        borderWidth: 3,
                                    }}
                                />
                            ) : null}
                        </View>
                    ) : null}
                    <View style={{ maxWidth: "50%" }}>
                        {
                            message.reply_to_message_id
                            && message.reply_to_message_text
                            && message.reply_to_message_sender_id
                            &&
                            <ReplyToMessage replyTo={{
                                reply_to_message_id: message.reply_to_message_id,
                                reply_to_message_sender_first_name: message.reply_to_message_sender_first_name ?? "",
                                reply_to_message_sender_last_name: message.reply_to_message_sender_last_name ?? "",
                                reply_to_message_sender_id: message.reply_to_message_sender_id,
                                reply_to_message_text: message.reply_to_message_text
                            }}
                                authUserId={authUserId}
                                fromSelf={!!message.fromSelf}
                            />
                        }
                        <View
                            style={{
                                ...styles.messageContainer,
                                backgroundColor: message.fromSelf
                                    ? BLUE_COLOR
                                    : LIGHT_GRAY_COLOR,
                                borderBottomLeftRadius: message.fromSelf
                                    ? 15
                                    : hasPrevFromSameSender
                                        ? 1
                                        : 15,
                                borderBottomRightRadius: !message.fromSelf
                                    ? 15
                                    : hasPrevFromSameSender
                                        ? 1
                                        : 15,
                                borderTopLeftRadius: message.fromSelf
                                    ? 15
                                    : hasNextFromSameSender
                                        ? 1
                                        : 15,
                                borderTopRightRadius: !message.fromSelf
                                    ? 15
                                    : hasNextFromSameSender
                                        ? 1
                                        : 15,
                            }}
                        >
                            {!hasNextFromSameSender &&
                                !message.fromSelf &&
                                showSenderName ? (
                                <Text
                                    style={{
                                        ...styles.senderName,
                                        color: message.fromSelf ? "#ffffff" : "#000000",
                                        alignSelf: message.fromSelf
                                            ? "flex-end"
                                            : "flex-start",
                                    }}
                                >
                                    {message.sender?.first_name}{" "}
                                    {message.sender?.last_name}
                                </Text>
                            ) : null}
                            <View>
                                <Text
                                    style={{
                                        ...styles.message,
                                        color: message.fromSelf ? "#ffffff" : "#000000",
                                    }}
                                >
                                    {message.text}
                                </Text>
                            </View>
                            {message.fromSelf ? (
                                <Text
                                    style={{
                                        alignSelf: "flex-end",
                                    }}
                                >
                                    {message.is_read ? (
                                        <View>
                                            <SeenIcon fill={"#fff"} />
                                        </View>
                                    ) : (
                                        <View>
                                            <SentIcon fill={"#fff"} />
                                        </View>
                                    )}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 1,
        alignItems: "flex-end",
    },
    contentContainer: {},
    dpContainer: {
        height: DP_WIDTH - 4,
        width: DP_WIDTH - 4,
    },
    messageContainer: {
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    dp: {
        height: "100%",
        width: "100%",
        borderRadius: DP_WIDTH - 4 / 2,
    },
    senderName: {
        marginVertical: 2,
        textTransform: "capitalize",
        fontWeight: "bold",
    },
    message: {
        lineHeight: 25,
    },
});
