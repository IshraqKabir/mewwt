import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { BACKGROUND_COLOR } from "../../../consts";
import { Search } from "../../components/Search/Search";
import { Header } from "./Header/Header";
import { SelectedUsersList } from "./SelectedUsersList/SelectedUsersList";
import { useCreateGroup } from "./useCreateGroup";
import { UsersList } from "./UsersList/Userslist";

export const CreateGroup = () => {
    const {
        handleSearchTextChange,
        text,
        users,
        selectedUsers,
        handleUserSelect,
        handleUserUnSelect,
    } = useCreateGroup();

    return (
        <View style={styles.container}>
            <Header />
            <Search
                handleChange={handleSearchTextChange}
                placeholder="Search Users"
                label="search:"
                value={text}
            />

            <SelectedUsersList
                selectedUsers={selectedUsers}
                handleRemove={handleUserUnSelect}
            />

            <UsersList
                users={users}
                selectedUsers={selectedUsers}
                handleSelect={handleUserSelect}
                handleUnSelect={handleUserUnSelect}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: BACKGROUND_COLOR,
    },
});
