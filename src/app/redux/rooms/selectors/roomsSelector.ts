import { RootState } from "../../store";

export const roomsSelector = (state: RootState) => {
    return state.rooms;
};
