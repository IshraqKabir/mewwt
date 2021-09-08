import { IUser } from "../../types/IUser";
import axiosInstance from "../../utils/axiosInterceptor";

export const getUser = async (): Promise<IUser | null> => {
    try {
        const response = await axiosInstance.get(`/api/auth/me`);
        return response.data;
    } catch (error) {
        return null;
    }
};
