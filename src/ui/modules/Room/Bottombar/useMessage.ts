import { useDispatch } from "react-redux";
import { Socket } from "socket.io-client";
import { useDebounce } from "../../../../app/customHooks/useDebounce";
import { sendMessageThunk } from "../../../../app/redux/rooms/thunks/sendMessageThunk";
import { IMessage } from "../../../../app/types/IMessage";

export const useMessage = (roomId: number, roomSocket: Socket | null) => {
    // const [text, setText] = useState("");
    const { value: text, setValue: setText } = useDebounce<string>("", () => {
        roomSocket?.emit("user-started-typing");
    }, () => {
        roomSocket?.emit("user-stopped-typing");
    }, 1000);
    // const [isUserTyping, setIsUserTyping] = useState(false);
    // const [prevTimeout, setPrevTimeOut] = useState<NodeJS.Timeout | null>(null);

    const dispatch = useDispatch();

    const handleSend = async () => {
        dispatch(sendMessageThunk({
            roomId,
            message: {
                text: text,
            } as IMessage,
        }));

        setText("");
    };

    const handleTextChange = (text: string) => {
        setText(text);
        // if (!isUserTyping) {
        //     roomSocket?.emit("user-started-typing");
        // }

        // setIsUserTyping(true);

        // const timeout = setTimeout(() => {
        //     roomSocket?.emit("user-stopped-typing");
        //     setIsUserTyping(false);
        // }, 1000);

        // if (prevTimeout) clearTimeout(prevTimeout);

        // setPrevTimeOut(timeout);
    };

    return {
        text,
        handleSend,
        handleTextChange,
    };
};

