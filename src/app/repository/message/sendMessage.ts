import { IMessage } from "../../types/IMessage";
import axiosInstance from "../../utils/axiosInterceptor";

export const sendMessage = async (roomId: number, message: IMessage): Promise<IMessage | null> => {
    try {
        const res = await axiosInstance.post(`/api/message/send`,
            // data
            {
                roomId,
                messageText: message.text,
            }
        );
        return res.data;
    } catch (error) {
        // console.log("error at SendMessage", error);
        return null;
    }
};
