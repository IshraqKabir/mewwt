import axios from "axios";
import axiosInstance from "../../utils/axiosInterceptor";

export const createRoom = async (
    userIds: number[],
    name?: string,
    isGroup?: boolean
): Promise<number | null> => {
    try {
        const res = await axiosInstance.post(
            `/api/room/create`,
            // data
            { userIds, name, isGroup: !!isGroup }
        );

        return res.data?.room_id;
    } catch (error) {
        if (axios.isCancel(error)) {
            // console.log("request cancelled");
        }
        return null;
    }
};
