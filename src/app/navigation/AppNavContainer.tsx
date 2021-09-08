import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator } from "./navigators/auth/AuthNavigator";
import { useInitToken } from "../customHooks/useInitToken";
import { useSetUser } from "../customHooks/useSetUser";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/auth/selectors/authSelector";
import { MainNavigator } from "./navigators/main/MainNavigator";

export const AppNavContainer = () => {
    useInitToken();
    const { authToken } = useSelector(authSelector);
    useSetUser(authToken);

    return (
        <NavigationContainer>
            {authToken ? <MainNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};
