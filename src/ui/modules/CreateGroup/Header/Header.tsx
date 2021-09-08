import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { BackIcon } from "../../../../assets/icons/BackIcon/BackIcon";
import { useSelector } from "react-redux";
import { createGroupSelector } from "../../../../app/redux/createGroup/selectors/createGroupSelector";

export const Header = () => {
    const { canGoBack, goBack } = useNavigation();
    const { selectedUsers } = useSelector(createGroupSelector);
    const enabled = selectedUsers.length > 1;

    const { navigate } = useNavigation();

    const handleBack = () => {
        if (canGoBack()) {
            goBack();
        }
    };

    const handleNext = () => {
        if (enabled) {
            navigate("name_new_group");
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <BackIcon fill="#000" handlePress={handleBack} />
            </View>
            <Text style={styles.header}>Add Participants</Text>
            <Pressable onPress={handleNext}>
                <Text
                    style={{
                        ...styles.next,
                        color: enabled ? "#000" : "gray",
                    }}
                >
                    Next
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        marginVertical: 20,
        marginHorizontal: 15,
    },
    header: {
        fontWeight: "700",
        fontSize: 18,
        marginLeft: "auto",
        marginRight: "auto",
    },
    cancelContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        textAlignVertical: "center",
        height: "100%",
    },
    next: {
        fontSize: 15,
    },
});
