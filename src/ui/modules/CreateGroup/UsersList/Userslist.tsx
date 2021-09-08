import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IUser } from "../../../../app/types/IUser";
import { pluck } from "../../../../app/utils/pluck";
import { UserChipWithCheckbox } from "../../../components/UserChipWithCheckbox/UsersChipWithCheckbox";

interface IProps {
    users: IUser[];
    selectedUsers: IUser[];
    handleSelect: (user: IUser) => void;
    handleUnSelect: (user: IUser) => void;
}

export const UsersList = ({
    users,
    selectedUsers,
    handleSelect,
    handleUnSelect,
}: IProps) => {
    return (
        <View style={styles.container}>
            {users.length ? (
                <View style={styles.listContainer}>
                    <FlatList
                        data={users}
                        keyExtractor={(user) => user.id}
                        renderItem={({ item: user }: { item: IUser }) => {
                            return (
                                <UserChipWithCheckbox
                                    key={user.id}
                                    user={user}
                                    isChecked={pluck(
                                        selectedUsers,
                                        "id"
                                    ).includes(user.id)}
                                    handleSelect={handleSelect}
                                    handleUnSelect={handleUnSelect}
                                />
                            );
                        }}
                    />
                </View>
            ) : (
                <Text style={styles.noUsersText}>No Users found</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 15,
    },
    noUsersText: {
        textAlign: "center",
        marginTop: "70%",
        color: "gray",
    },
    listContainer: {},
    listHeader: {
        color: "gray",
        marginBottom: 15,
    },
});
