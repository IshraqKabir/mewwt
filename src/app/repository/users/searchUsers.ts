import { BACKEND_URL } from "../../../../config/envs";
import { IUser } from "../../types/IUser";
import axiosInstance from "../../utils/axiosInterceptor";

export const searchUsers = async (q: string): Promise<IUser[]> => {
    try {
        const res = await axiosInstance.get(`${BACKEND_URL}/api/users/list`, {
            params: { q: q.trim() },
        });
        return res.data;
    } catch (error) {
        return [];
    }
};
