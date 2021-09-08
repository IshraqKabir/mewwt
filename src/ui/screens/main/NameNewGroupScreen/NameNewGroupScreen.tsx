import React from "react";
import { INavContext } from "../../../../app/types/INavContext";
import { NameNewGroup } from "../../../modules/NameNewGroup/NameNewGroup";

export const NameNewGroupScreen = ({ navigation }: INavContext) => {
    return <NameNewGroup navigation={navigation} />;
};
