import React, { memo, useMemo } from "react";
import { Image, Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { IMessage } from "../../../app/types/IMessage";
import { SeenIcon } from "../../../assets/icons/SeenIcon/SeenIcon";
import { SentIcon } from "../../../assets/icons/SentIcon/SentIcon";
import { BLUE_COLOR, DP_WIDTH, LIGHT_GRAY_COLOR } from "../../../consts";
import { ReplyToMessage } from "../ReplyToMessage/ReplyToMessage";
import { useMessage } from "./useMessage";

const DP = require("../../../assets/images/default_dp.jpg");

interface IProps {
    index: number;
    message: IMessage;
    authUserId: number;
    allMessages: IMessage[];
    isGroup: boolean;
    handleReplyToClick: (reply_to_message_id: number) => void;
}

// has prev means down
// has next means up

export const Message = memo(({
    index,
    message,
    authUserId,
    allMessages,
    isGroup,
    handleReplyToClick
}: IProps) => {
    const {
        fromSelf,
        gestureHandler,
        hasNextFromSameSender,
        hasPrevFromSameSender,
        isRead,
        isUserOnline,
        messageReplyAnimatedStyles,
        showSenderName
    } = useMessage(
        index,
        message,
        authUserId,
        allMessages,
        isGroup
    );

    return (
        <View>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[{
                        ...styles.container,
                        alignSelf: fromSelf ? "flex-end" : "flex-start",
                        flexDirection: fromSelf ? "row-reverse" : "row",
                        marginBottom: !hasPrevFromSameSender ? 15 : 1,
                    }, messageReplyAnimatedStyles]}
                >
                    {!fromSelf ? (
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
                            <Pressable onPress={() => handleReplyToClick(message.reply_to_message_id ?? 0)}>
                                <ReplyToMessage
                                    replyTo={{
                                        reply_to_message_id: message.reply_to_message_id,
                                        reply_to_message_sender_first_name: message.reply_to_message_sender_first_name ?? "",
                                        reply_to_message_sender_last_name: message.reply_to_message_sender_last_name ?? "",
                                        reply_to_message_sender_id: message.reply_to_message_sender_id,
                                        reply_to_message_text: message.reply_to_message_text
                                    }}
                                    authUserId={authUserId}
                                    fromSelf={!!fromSelf}
                                />
                            </Pressable>
                        }
                        <View
                            style={{
                                ...styles.messageContainer,
                                backgroundColor: fromSelf
                                    ? BLUE_COLOR
                                    : LIGHT_GRAY_COLOR,
                                borderBottomLeftRadius: fromSelf
                                    ? 15
                                    : hasPrevFromSameSender
                                        ? 1
                                        : 15,
                                borderBottomRightRadius: !fromSelf
                                    ? 15
                                    : hasPrevFromSameSender
                                        ? 1
                                        : 15,
                                borderTopLeftRadius: fromSelf
                                    ? 15
                                    : hasNextFromSameSender
                                        ? 1
                                        : 15,
                                borderTopRightRadius: !fromSelf
                                    ? 15
                                    : hasNextFromSameSender
                                        ? 1
                                        : 15,
                            }}
                        >
                            {!hasNextFromSameSender &&
                                !fromSelf &&
                                showSenderName ? (
                                <Text
                                    style={{
                                        ...styles.senderName,
                                        color: "#000000",
                                        alignSelf: fromSelf
                                            ? "flex-end"
                                            : "flex-start",
                                    }}
                                >
                                    {message.sender_first_name}{" "}
                                    {message.sender_last_name}
                                </Text>
                            ) : null}
                            <View>
                                <Text
                                    style={{
                                        ...styles.message,
                                        color: fromSelf ? "#ffffff" : "#000000",
                                        alignSelf: fromSelf ? "flex-end" : "flex-start"
                                    }}
                                >
                                    {message.text}
                                </Text>
                            </View>
                            {fromSelf ? (
                                <Text
                                    style={{
                                        alignSelf: "flex-end",
                                    }}
                                >
                                    {isRead ? (
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
}, (prev, next) => {
    // if the message is not from self then no need to update isRead
    if (next.message.sender_id !== next.authUserId) return true;

    if (prev.message.readerIds?.filter((id: number | null) => id !== null).length !== next.message.readerIds?.filter(id => id !== null).length) return false;

    return true;
});

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
