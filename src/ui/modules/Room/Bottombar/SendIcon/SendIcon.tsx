import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Svg, Path } from "react-native-svg";
import { BLUE_COLOR, GRAY_COLOR, } from "../../../../../consts";

interface IProps {
    handlePress: Function;
    isDisabled?: boolean;
}

export const SendIcon = ({ handlePress, isDisabled = false }: IProps) => {
    return (
        <Pressable
            onPress={() => {
                if (!isDisabled) {
                    handlePress();
                }
            }}
        >
            <Svg
                style={{ ...styles.sendIcon, }}
                viewBox="0 0 512 512" fill="none"
            >
                <Path
                    d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808
			L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193
			c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409
			C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"
                    fill={isDisabled ? GRAY_COLOR : BLUE_COLOR}
                />
            </Svg>
        </Pressable >
    );
};

const styles = StyleSheet.create({
    sendIcon: {
        height: 50,
        width: 30,
        padding: 0,
        marginLeft: 15,
    }
});