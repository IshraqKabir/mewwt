import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { BLUE_COLOR } from "../../../consts";

interface IProps {
    placeholder: string;
    value: string;
    handleChange: Function;
    style?: any;
    label?: string;
}

export const Search = ({
    placeholder,
    value,
    handleChange,
    style,
    label,
}: IProps) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            {label ? (
                <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{label}</Text>
                </View>
            ) : null}
            <View style={styles.inputContainer}>
                <TextInput
                    value={value}
                    onChangeText={(text) => handleChange(text)}
                    style={{ ...styles.input, ...style }}
                    placeholder={placeholder}
                    placeholderTextColor="lightgray"
                    selectionColor={BLUE_COLOR}
                    autoCompleteType="off"
                    autoFocus={true}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F9F8F9",
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    labelContainer: {},
    labelText: {
        color: "gray",
        textAlignVertical: "center",
    },
    inputContainer: {
        width: "100%",
        marginLeft: 5,
    },
    input: {
        width: "100%",
        color: "#000000",
        padding: 0,
    },
});
