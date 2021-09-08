import React from "react";
import { ChatsScreen } from "../../../../ui/screens/main/ChatsScreen/ChatsScreen";
import { GroupsScreen } from "../../../../ui/screens/main/GroupScreen/GroupScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ChatListTabBar } from "../../../../ui/components/ChatListTabBar/ChatListTabBar";
import { ChatListTopbar } from "../../../../ui/components/ChatListTopbar/ChatListTopbar";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/core";
import { useUserSocket } from "./useUserSocket";

const Tab = createMaterialTopTabNavigator();

interface IProps {
    navigation: NavigationProp<any, any>;
}

export function ChatsNavigator({ navigation }: IProps) {
    const [routeName, setRouteName] = useState("chats");

    return (
        <>
            <ChatListTopbar routeName={routeName} navigation={navigation} />
            <Tab.Navigator
                tabBarPosition="bottom"
                tabBar={(props) => {
                    return (
                        <ChatListTabBar
                            {...props}
                            setRouteName={setRouteName}
                        />
                    );
                }}
                screenOptions={{}}
            >
                <Tab.Screen name="chats" component={ChatsScreen} />
                <Tab.Screen name="groups" component={GroupsScreen} />
            </Tab.Navigator>
        </>
    );
}
