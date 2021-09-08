import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import { Svg, Path } from "react-native-svg";

export const ArrowRightIcon = () => {
    const { navigate } = useNavigation();

    return (
        <Pressable
            onPress={() => {
                navigate("new_message");
            }}
        >
            <Svg width={8} height={13} viewBox="0 0 8 13">
                <Path
                    d="M0 11.4122L1.41421 12.8264L7.82742 6.4132L1.41421 0L0 1.41421L4.99899 6.4132L0 11.4122Z"
                    fill="black"
                    fillOpacity="0.2"
                />
            </Svg>
        </Pressable>
    );
};
