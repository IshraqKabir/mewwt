import { IMessage } from "../../types/IMessage";
import axiosInstance from "../../utils/axiosInterceptor";

export const getRoomMessages = async (roomId: number, page: number): Promise<IMessage[]> => {
    try {
        const res = await axiosInstance.get(`/api/message/room/${roomId}/messages?page=${page}`);
        return res.data;
    } catch (error) {
        // console.log("get room messages error", error);
        return [];
    }
};
