import { RootState } from "../../store";

export const createGroupSelector = (state: RootState) => {
    return state.createGroup;
};
