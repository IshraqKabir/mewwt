import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface IProps {
    name: string;
    setName: Function;
}

export const GroupName = ({ name, setName }: IProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(text) => {
                    setName(text);
                }}
                textContentType="emailAddress"
                value={name}
                placeholder="Group Name (Required)"
                placeholderTextColor="gray"
                maxLength={50}
                style={{
                    color: "black",
                    borderBottomColor: "lightgray",
                    borderBottomWidth: 1,
                    padding: 0,
                    paddingBottom: 5,
                    fontSize: 18,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
});
