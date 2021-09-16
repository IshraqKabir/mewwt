import { IMessage } from "../../types/IMessage";
import { IReplyTo } from "../../types/IReplyTo";
import axiosInstance from "../../utils/axiosInterceptor";

export const sendMessage = async (roomId: number, message: IMessage, replyTo?: IReplyTo): Promise<IMessage | null> => {
    try {
        const res = await axiosInstance.post(`/api/message/send`,
            // data
            {
                roomId,
                messageText: message.text,
                reply_to_message_id: replyTo ? Number(replyTo.reply_to_message_id) : undefined
            }
        );
        return res.data;
    } catch (error) {
        // console.log("error at SendMessage", error);
        return null;
    }
};
