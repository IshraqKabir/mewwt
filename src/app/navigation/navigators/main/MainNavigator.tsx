import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateGroupScreen } from "../../../../ui/screens/main/CreateGroupScreen/CreateGroupScreen";
import { NameNewGroupScreen } from "../../../../ui/screens/main/NameNewGroupScreen/NameNewGroupScreen";
import { NewMessageScreen } from "../../../../ui/screens/main/NewMessageScreen/NewMessageScreen";
import { RoomScreen } from "../../../../ui/screens/main/RoomScreen/RoomScreen";
import { useUnreadMessagesCount } from "../../../customHooks/useUnreadMessagesCount";
import { ChatsNavigator } from "./ChatsNavigator";
import { useUserSocket } from "./useUserSocket";
import { useChatMatesOnlineStatuses } from "../../../customHooks/useChatMatesOnlineStatuses";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MainStack = createStackNavigator();

export const MainNavigator = () => {
    const { isConnected } = useUserSocket();
    useUnreadMessagesCount();
    useChatMatesOnlineStatuses();

    return (
        <>
            {/* <Text style={{ backgroundColor: "white", color: "black" }}>
                isConnected : {isConnected ? "true" : "false"}
            </Text> */}
            <MainStack.Navigator
                initialRouteName="chats_tabs"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <MainStack.Screen
                    name="chats_tabs"
                    component={ChatsNavigator}
                />
                <MainStack.Screen
                    name="new_message"
                    component={NewMessageScreen}
                />
                <MainStack.Screen name="room" component={RoomScreen} />
                <MainStack.Screen
                    name="create_group"
                    component={CreateGroupScreen}
                />
                <MainStack.Screen
                    name="name_new_group"
                    component={NameNewGroupScreen}
                />
            </MainStack.Navigator>
        </>
    );
};
