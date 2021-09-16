import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearch } from "../../../app/customHooks/useSearch";
import { authSelector } from "../../../app/redux/auth/selectors/authSelector";
import {
    addUsers,
    selectUser,
    unSelectUser,
} from "../../../app/redux/createGroup/createGroupActions";
import { createGroupSelector } from "../../../app/redux/createGroup/selectors/createGroupSelector";
import { searchUsersThunk } from "../../../app/redux/createGroup/thunks/searchUsersThunk ";
import { IUser } from "../../../app/types/IUser";

export const useCreateGroup = () => {
    const { chatMates } = useSelector(authSelector);
    const dispatch = useDispatch();
    const { users, selectedUsers } = useSelector(createGroupSelector);
    const { text, handleChange: handleSearchTextChange } = useSearch(
        searchUsersThunk,
        ""
    );

    useEffect(() => {
        if (users.length === 0) {
            dispatch(addUsers(chatMates));
        }
    }, [chatMates]);

    const handleUserSelect = (user: IUser) => {
        dispatch(selectUser(user));
    };

    const handleUserUnSelect = (user: IUser) => {
        dispatch(unSelectUser(user));
    };

    return {
        handleSearchTextChange,
        text,
        users,
        selectedUsers,
        handleUserSelect,
        handleUserUnSelect,
    };
};
