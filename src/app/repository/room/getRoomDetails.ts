import axios from "axios";
import { IRoom } from "../../types/IRoom";
import axiosInstance from "../../utils/axiosInterceptor";

export const getRoomDetails = async (roomId: number): Promise<IRoom | null> => {
    try {
        const res = await axiosInstance.get(`/api/room/${roomId}/details`);
        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            // console.log("request cancelled");
        }
        return null;
    }
};