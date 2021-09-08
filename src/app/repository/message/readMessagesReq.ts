import axiosInstance from "../../utils/axiosInterceptor";

export const readMessagesReq = (roomId: number, messageIds: number[]) => {
    try {
        axiosInstance.post("/api/message/messages/read", {
            roomId, messageIds
        });
    } catch (error) {
        return null;
    }
};
