import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IUser } from "../../../../app/types/IUser";
import { SelectedUserChip } from "../../../components/SelectedUserChip/SelectedUserChip";

interface IProps {
    selectedUsers: IUser[];
    handleRemove: (user: IUser) => void;
}

export const SelectedUsersList = ({ selectedUsers, handleRemove }: IProps) => {
    return (
        <View
            style={{
                ...styles.container,
                padding: selectedUsers.length > 0 ? 15 : 0,
            }}
        >
            {selectedUsers.length ? (
                <View style={styles.listContainer}>
                    <FlatList
                        horizontal={true}
                        data={selectedUsers}
                        keyExtractor={(user) => user.id}
                        renderItem={({ item: user }: { item: IUser }) => {
                            return (
                                <SelectedUserChip
                                    key={user.id}
                                    user={user}
                                    handleRemove={handleRemove}
                                />
                            );
                        }}
                    />
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    noUsersText: {
        textAlign: "center",
        color: "gray",
    },
    listContainer: {},
    listHeader: {
        color: "gray",
        marginBottom: 15,
    },
});
