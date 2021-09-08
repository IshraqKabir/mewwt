import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export const Header = () => {
    const { goBack, canGoBack } = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.cancelContainer}
                onPress={() => {
                    if (canGoBack()) {
                        goBack();
                    }
                }}
            >
                <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
            <View>
                <Text style={styles.header}>New Message</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        marginVertical: 20,
        marginHorizontal: 15,
    },
    header: {
        fontWeight: "700",
        fontSize: 18,
    },
    cancelContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        textAlignVertical: "center",
        height: "100%",
    },
    cancel: {
        fontSize: 18,
    },
});
