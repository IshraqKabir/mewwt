import { useEffect, useRef } from "react";
import { TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { useDebounce } from "../../../../app/customHooks/useDebounce";
import { setReplyTo } from "../../../../app/redux/rooms/roomsActions";
import { sendMessageThunk } from "../../../../app/redux/rooms/thunks/sendMessageThunk";
import { IMessage } from "../../../../app/types/IMessage";
import { IReplyTo } from "../../../../app/types/IReplyTo";
import { IUser } from "../../../../app/types/IUser";
import { pluck } from "../../../../app/utils/pluck";

export const useSendMessage = (roomId: number, roomSocket: Socket | null, roomUsers: IUser[], replyTo?: IReplyTo) => {
    const { value: text, setValue: setText } = useDebounce<string>("", () => {
        roomSocket?.emit("user-started-typing", { userIds: pluck(roomUsers, "id") });
    }, () => {
        roomSocket?.emit("user-stopped-typing", { userIds: pluck(roomUsers, "id") });
    }, 500);

    const dispatch = useDispatch();

    const textInputRef = useRef<TextInput>();

    // kinda makes the user experience worse
    // is a bit laggy
    // useEffect(() => {
    //     setTimeout(() => {
    //         if (textInputRef.current && !!replyTo) {
    //             textInputRef.current.focus();
    //         } else if (textInputRef.current && !replyTo) {
    //             textInputRef.current.blur();
    //         }
    //     }, 500);
    // }, [replyTo]);

    const handleSend = async () => {
        dispatch(sendMessageThunk({
            roomId,
            message: {
                text: text,
            } as IMessage,
            replyTo: replyTo
        }));

        // set replyTo to null after sending
        dispatch(setReplyTo({
            replyTo: null,
            roomId: roomId
        }));

        setText("");
    };

    const handleTextChange = (text: string) => {
        setText(text);
    };

    return {
        text,
        handleSend,
        handleTextChange,
        textInputRef
    };
};

