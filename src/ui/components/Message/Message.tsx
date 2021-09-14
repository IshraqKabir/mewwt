import React from "react";
import { Image } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { IMessage } from "../../../app/types/IMessage";
import { SeenIcon } from "../../../assets/icons/SeenIcon/SeenIcon";
import { SentIcon } from "../../../assets/icons/SentIcon/SentIcon";
import { BLUE_COLOR, DP_WIDTH, LIGHT_GRAY_COLOR } from "../../../consts";
import { useMessageReply } from "./useMessageReply";

const DP = require("../../../assets/images/default_dp.jpg");

interface IProps {
    message: IMessage;
    hasNextFromSameSender: boolean;
    hasPrevFromSameSender: boolean;
    showSenderName: boolean;
    isUserOnline: boolean;
}

// has prev means down
// has next means up

export const Message = ({
    message,
    hasNextFromSameSender,
    hasPrevFromSameSender,
    showSenderName,
    isUserOnline,
}: IProps) => {
    const { animatedStyles: messageReplyAnimatedStyles, gestureHandler } = useMessageReply(message);

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
                        <Text
                            style={{
                                ...styles.message,
                                color: message.fromSelf ? "#ffffff" : "#000000",
                            }}
                        >
                            {message.text}
                        </Text>
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
        maxWidth: "50%",
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
