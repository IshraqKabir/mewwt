import { IUser } from "../../types/IUser";
import axiosInstance from "../../utils/axiosInterceptor";

export const getUserChatMates = async (): Promise<IUser[]> => {
    try {
        const res = await axiosInstance.get(`/api/auth/chat-mates`);
        return res.data;
    } catch (error) {
        return [];
    }
};
