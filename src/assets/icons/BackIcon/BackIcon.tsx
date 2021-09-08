import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Svg, Path } from "react-native-svg";
import { BACK_ICON_HEIGHT, BACK_ICON_WIDTH } from "../../../consts";

interface IProps {
    fill: string;
    handlePress: Function;
}

const HIT_SLOP = 10;

export const BackIcon = ({ fill, handlePress }: IProps) => {
    return (
        <Pressable
            onPress={() => {
                handlePress();
            }}
            hitSlop={{
                bottom: HIT_SLOP,
                left: HIT_SLOP,
                right: HIT_SLOP,
                top: HIT_SLOP,
            }}
        >
            <Svg style={styles.backIcon} viewBox="0 0 13 23">
                <Path
                    d="M12.183 2.56066C12.7688 1.97487 12.7688 1.02513 12.183 0.43934C11.5972 -0.146447 10.6475 -0.146447 10.0617 0.43934L0.43934 10.0617C-0.146447 10.6475 -0.146447 11.5972 0.43934 12.183L10.0617 21.8054C10.6475 22.3912 11.5972 22.3912 12.183 21.8054C12.7688 21.2196 12.7688 20.2699 12.183 19.6841L3.62132 11.1224L12.183 2.56066Z"
                    fill={fill}
                />
            </Svg>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    backIcon: {
        width: BACK_ICON_WIDTH,
        height: BACK_ICON_HEIGHT,
    },
});
