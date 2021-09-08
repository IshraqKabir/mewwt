import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Login } from "../../../../ui/screens/auth/Login/Login";
import { Register } from "../../../../ui/screens/auth/Register/Register";

const AuthStack = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="login" component={Login} />
            <AuthStack.Screen name="register" component={Register} />
        </AuthStack.Navigator>
    );
};
