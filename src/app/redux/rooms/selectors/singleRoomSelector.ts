import { IRoom } from "../../../types/IRoom";
import { RootState } from "../../store";

export const singleRoomSelector = (
    state: RootState,
    roomId: number,
    is_group?: boolean
): IRoom => {
    return (
        state.rooms.rooms.find((room) => room.id == roomId) ?? {
            id: 0,
            name: "",
            messages: [],
            users: [],
            is_group: !!is_group,
            roomPresences: [],
        }
    );
};
