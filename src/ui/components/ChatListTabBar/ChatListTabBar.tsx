import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BACKGROUND_COLOR } from "../../../consts";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { ChatsIcon } from "./ChatsIcon/ChatsIcon";
import { GroupsIcon } from "./GroupsIcon/GroupsIcon";

export const ChatListTabBar = ({
    state,
    descriptors,
    navigation,
    position,
    setRouteName,
}: MaterialTopTabBarProps & { setRouteName: Function }) => {
    useEffect(() => {
        setRouteName(state.routes[state.index].name);
    }, [state.routes]);

    return (
        <View style={styles.outerContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({
                            key: "",
                            name: route.name,
                            merge: true,
                        });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            width: `${100 / state.routes.length}%`,
                        }}
                        key={index}
                    >
                        {route.name === "chats" ? (
                            <ChatsIcon isFocused={isFocused} />
                        ) : (
                            <GroupsIcon isFocused={isFocused} />
                        )}
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flexDirection: "row",
        paddingHorizontal: 50,
        backgroundColor: BACKGROUND_COLOR,
        borderTopColor: "lightgray",
        borderTopWidth: 1,
        paddingVertical: 10,
    },
});
