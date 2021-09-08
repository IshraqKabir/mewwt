import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { ArrowRightIcon } from "../../../../assets/icons/ArrowRightIcon/ArrowRightIcon";
import { NewGroupIcon } from "../../../../assets/icons/NewGroupIcon/NewGroupIcon";

interface IProps {}

export const CreateGroupChip = ({}: IProps) => {
    const { navigate } = useNavigation();

    const handlePress = () => {
        navigate("create_group");
    };

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <NewGroupIcon />
            <Text style={styles.title}>Create New Group</Text>
            <View style={styles.arrowRightContainer}>
                <ArrowRightIcon />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        marginLeft: 15,
        fontSize: 17,
        fontWeight: "bold",
    },
    arrowRightContainer: {
        marginLeft: "auto",
    },
});
