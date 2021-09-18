import { IMessage } from "../../types/IMessage";
import axiosInstance from "../../utils/axiosInterceptor";

export const getRoomMessagesWithRange = async (roomId: number, start: number, end: number): Promise<IMessage[]> => {
    try {
        const res = await axiosInstance.get(`/api/message/room/${roomId}/messages-with-range?start=${start}&end=${end}`);
        return res.data;
    } catch (error) {
        // console.log("get room messages error", error);
        return [];
    }
};
