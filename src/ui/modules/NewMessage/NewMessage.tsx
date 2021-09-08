import React from "react";
import { View, StyleSheet } from "react-native";
import { Header } from "./Header/Header";
import { Search } from "../../components/Search/Search";
import { useSearch } from "../../../app/customHooks/useSearch";

import { BACKGROUND_COLOR } from "../../../consts";
import { useSelector } from "react-redux";
import { newMessageSelector } from "../../../app/redux/newMessage/selectors/newMessageSelector";
import { searchUsersThunk } from "../../../app/redux/newMessage/thunks/searchUsersThunk";
import { UsersList } from "./UsersList/UsersList";
import { CreateGroupChip } from "./CreateGroupChip/CreateGroupChip";

export const NewMessage = () => {
    const { text, handleChange } = useSearch(searchUsersThunk, "kabir");

    const { users } = useSelector(newMessageSelector);

    return (
        <View style={styles.container}>
            <Header />
            <Search
                value={text}
                handleChange={handleChange}
                placeholder={"Type a name or group"}
                label={"To:"}
            />
            <CreateGroupChip />
            <UsersList users={users} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: BACKGROUND_COLOR,
    },
});
