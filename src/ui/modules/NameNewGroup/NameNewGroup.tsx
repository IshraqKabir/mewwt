import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { createGroupSelector } from "../../../app/redux/createGroup/selectors/createGroupSelector";
import { INavContext } from "../../../app/types/INavContext";
import { NewNameGroupNavigationContext } from "../../contexts/NewNameGroupNavigationContext";
import { GroupName } from "./GroupName/GroupName";
import { Header } from "./Header/Header";
import { ParticipentList } from "./ParticipentList/Participentlist";

export const NameNewGroup = ({ navigation }: INavContext) => {
    const { selectedUsers } = useSelector(createGroupSelector);
    const [name, setName] = useState("");

    return (
        <View>
            <NewNameGroupNavigationContext.Provider
                value={{ navigation: navigation }}
            >
                <Header name={name} />
                <GroupName name={name} setName={setName} />
                <ParticipentList users={selectedUsers} />
            </NewNameGroupNavigationContext.Provider>
        </View>
    );
};
