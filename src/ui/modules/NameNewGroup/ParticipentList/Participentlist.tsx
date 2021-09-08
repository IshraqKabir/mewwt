import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { IUser } from "../../../../app/types/IUser";
import { UserChip } from "../../../components/UserChip/UsersChip";

interface IProps {
    users: IUser[];
}

export const ParticipentList = ({ users }: IProps) => {
    const handlePress = async (_: IUser, __: Function) => {};

    return (
        <View style={styles.container}>
            {users.length ? (
                <View style={styles.listContainer}>
                    <Text style={styles.listHeader}>
                        {users.length} Participents
                    </Text>
                    <FlatList
                        data={users}
                        keyExtractor={(user) => user.id}
                        renderItem={({ item: user }: { item: IUser }) => {
                            return (
                                <UserChip
                                    key={user.id}
                                    user={user}
                                    handlePress={handlePress}
                                    shouldDisableAfterPress={false}
                                />
                            );
                        }}
                    />
                </View>
            ) : (
                <Text style={styles.noUsersText}>
                    No Participents! Can Not Create A Group.
                </Text>
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
