import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { createRoom } from "../../../../app/repository/room/createRoom";
import { IUser } from "../../../../app/types/IUser";
import { UserChip } from "../../../components/UserChip/UsersChip";

interface IProps {
    users: IUser[];
}

export const UsersList = ({ users }: IProps) => {
    const { navigate } = useNavigation();

    const handlePress = async (user: IUser, callBack: Function) => {
        const roomId = await createRoom([user.id]);

        if (!roomId) {
            // console.log("something went wrong");
        }

        callBack();
        navigate("room", {
            room_id: roomId,
        });
    };

    return (
        <View style={styles.container}>
            {users.length ? (
                <View style={styles.listContainer}>
                    <Text style={styles.listHeader}>Users</Text>
                    <FlatList
                        data={users}
                        keyExtractor={(user) => user.id}
                        renderItem={({ item: user }: { item: IUser }) => {
                            return (
                                <UserChip
                                    key={user.id}
                                    user={user}
                                    handlePress={handlePress}
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
