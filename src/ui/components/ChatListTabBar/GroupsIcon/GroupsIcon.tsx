import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { roomsSelector } from "../../../../app/redux/rooms/selectors/roomsSelector";

interface IProps {
    isFocused: boolean;
}

export const GroupsIcon = ({ isFocused }: IProps) => {
    const { unreadMessagesCount } = useSelector(roomsSelector);

    return (
        <View style={{ alignItems: "center" }}>
            <View>
                <Icon
                    name="account-group"
                    color={isFocused ? "black" : "lightgray"}
                    size={30}
                    style={{
                        alignSelf: "center",
                    }}
                />
                {unreadMessagesCount.groups > 0 ? (
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
                            {unreadMessagesCount.groups}
                        </Text>
                    </View>
                ) : null}
            </View>
            <Text
                style={{
                    color: isFocused ? "black" : "lightgray",
                }}
            >
                Groups
            </Text>
        </View>
    );
};
