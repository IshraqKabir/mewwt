import { IUserOnlineStatus } from "../../types/IUserOnlineStatus";
import axiosInstance from "../../utils/axiosInterceptor";

export const getChatMatesOnlineStatuses = async (
    chatMatesIds: number[]
): Promise<{ [id: number]: IUserOnlineStatus }> => {
    try {
        const res = await axiosInstance.post(
            `/api/auth/chat-mates-online-statuses`,
            {
                userIds: chatMatesIds,
            }
        );
        return res.data;
    } catch (error) {
        return [];
    }
};
