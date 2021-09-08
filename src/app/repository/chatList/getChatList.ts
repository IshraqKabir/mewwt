import { IRoomChip } from "../../types/IRoomChip";
import axiosInstance from "../../utils/axiosInterceptor";

export const getChatlist = async (): Promise<IRoomChip[]> => {
    try {
        const res = await axiosInstance.get(`/api/room/user/room-list`);
        return res.data;
    } catch (error) {
        return [];
    }
};
