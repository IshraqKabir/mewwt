import React from "react";
import { StyleSheet, Image, View, Text, Pressable } from "react-native";
import { IRoomChip } from "../../../app/types/IRoomChip";
import { capitalizeFirstLetter } from "../../../app/utils/capitalizeFirstLetter";
import { SeenIcon } from "../../../assets/icons/SeenIcon/SeenIcon";
import { SentIcon } from "../../../assets/icons/SentIcon/SentIcon";
import { DP_WIDTH } from "../../../consts";
import { useTime } from "../../customHooks/useTime";
import { getIsRoomChipRead } from "../../../app/utils/getIsRoomChipRead";
import { IChatMate } from "../../../app/types/IChatMate";
import { isRoomChipActive } from "../../../app/utils/isRoomChipActive";

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
                        color: getIsRoomChipRead(roomChip, authUserId)
                            ? "gray"
                            : "black",
                        fontWeight: getIsRoomChipRead(roomChip, authUserId)
                            ? "normal"
                            : "bold",
                    }}
                    numberOfLines={1}
                >
                    {roomChip.sender_id === authUserId
                        ? "You: "
                        : roomChip.is_group
                        ? roomChip.sender_first_name
                            ? `${capitalizeFirstLetter(
                                  roomChip.sender_first_name
                              )}: `
                            : ""
                        : ""}
                    {`${roomChip.message_text.slice(0, 10)}${
                        roomChip.message_text?.length > 10 ? "..." : ""
                    }`}
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
