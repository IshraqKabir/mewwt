import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { roomsSelector } from "../../../../app/redux/rooms/selectors/roomsSelector";

interface IProps {
    isFocused: boolean;
}

export const ChatsIcon = ({ isFocused }: IProps) => {
    const { unreadMessagesCount } = useSelector(roomsSelector);

    return (
        <View style={{ alignItems: "center" }}>
            <View>
                <Icon
                    name="chatbubble-sharp"
                    color={isFocused ? "black" : "lightgray"}
                    size={30}
                    style={{
                        alignSelf: "center",
                    }}
                />
                {unreadMessagesCount.chats > 0 ? (
                    <View
                        style={{
                            position: "absolute",
                            right: -10,
                            top: -5,
                            backgroundColor: "red",
                            width: 20,
                            height: 20,
                            borderRadius: 25,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: 10,
                            }}
                        >
                            {unreadMessagesCount.chats}
                        </Text>
                    </View>
                ) : null}
            </View>
            <Text
                style={{
                    color: isFocused ? "black" : "lightgray",
                }}
            >
                Chats
            </Text>
        </View>
    );
};
