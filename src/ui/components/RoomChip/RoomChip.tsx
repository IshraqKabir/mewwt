import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IChatMate } from "../../../app/types/IChatMate";
import { IRoomChip } from "../../../app/types/IRoomChip";
import { IUser } from "../../../app/types/IUser";
import { capitalizeFirstLetter } from "../../../app/utils/capitalizeFirstLetter";
import { getIsRoomChipRead } from "../../../app/utils/getIsRoomChipRead";
import { isRoomChipActive } from "../../../app/utils/isRoomChipActive";
import { SeenIcon } from "../../../assets/icons/SeenIcon/SeenIcon";
import { SentIcon } from "../../../assets/icons/SentIcon/SentIcon";
import { DP_WIDTH } from "../../../consts";
import { useTime } from "../../customHooks/useTime";

const DP = require("../../../assets/images/default_dp.jpg");

interface IProps {
    roomChip: IRoomChip;
    handlePress: Function;
    authUserId?: number;
    chatMates: IChatMate[];
}

export const RoomChip = ({
    roomChip,
    handlePress,
    authUserId,
    chatMates,
}: IProps) => {
    const { time } = useTime(roomChip.message_created_at);

    const isActive = isRoomChipActive(roomChip, chatMates, authUserId ?? 0);

    const typingUsers = getTypingUsers(roomChip.users);

    const message = getMessageText(roomChip.message_text, typingUsers, roomChip.is_group);

    const messageColor = getIsRoomChipRead(roomChip, authUserId)
        ? "gray"
        : "black";

    const messageFont = getIsRoomChipRead(roomChip, authUserId)
        ? "normal"
        : "bold";

    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                handlePress(roomChip.room_id);
            }}
        >
            <Image
                source={DP}
                style={{
                    ...styles.dp,
                    borderColor: isActive ? "green" : "transparent",
                    borderWidth: 3,
                }}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.roomName}>{roomChip.room_name}</Text>
                <Text
                    style={{
                        ...styles.messageText,
                        color: messageColor,
                        fontWeight: messageFont,
                    }}
                    numberOfLines={1}
                >
                    {typingUsers.length === 0 ?
                        <Text>
                            {roomChip.sender_id === authUserId
                                ? "You: "
                                : roomChip.is_group
                                    ? roomChip.sender_first_name
                                        ? `${capitalizeFirstLetter(
                                            roomChip.sender_first_name
                                        )}: `
                                        : ""
                                    : ""}
                        </Text>
                        : null}

                    <Text style={{ color: typingUsers.length > 0 ? "green" : messageColor, fontWeight: messageFont }}>
                        {`${message.slice(0, 20)}${message.length > 20 ? "..." : ""
                            }`}
                    </Text>
                    {roomChip.message_created_at && `  .  ${time}`}
                </Text>
            </View>
            {roomChip.sender_id === authUserId ? (
                <Text
                    style={{
                        position: "absolute",
                        right: 10,
                        bottom: "70%",
                    }}
                >
                    {roomChip.is_read ? (
                        <View>
                            <SeenIcon fill={"#000"} />
                        </View>
                    ) : (
                        <View>
                            <SentIcon fill={"#000"} />
                        </View>
                    )}
                </Text>
            ) : null}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    dp: {
        height: DP_WIDTH + 5,
        width: DP_WIDTH + 5,
        borderRadius: DP_WIDTH + 5 / 2,
    },
    contentContainer: {
        marginLeft: 10,
    },
    roomName: {
        textTransform: "capitalize",
        fontWeight: "bold",
        marginBottom: 5,
    },
    messageText: {},
});

const getTypingUsers = (users: (IUser & { isTyping: boolean; })[]) => {
    return users.filter(user => user.isTyping);
};

const getMessageText = (message: string, typingUsers: (IUser & { isTyping: boolean; })[], is_group: boolean) => {
    return typingUsers.length > 0 ?
        typingUsers[0] ?
            `${is_group ? `${capitalizeFirstLetter(typingUsers[0].first_name)} is typing...` : "typing..."}`
            : message
        : message;
};
