import { Dimensions } from "react-native";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, runOnJS, withTiming, cancelAnimation } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { setReplyTo } from "../../../app/redux/rooms/roomsActions";
import { IMessage } from "../../../app/types/IMessage";

export const useMessageReply = (message: IMessage, fromSelf: boolean) => {
    const dispatch = useDispatch();

    const setReplyToEvent = () => {
        dispatch(setReplyTo({
            replyTo: {
                reply_to_message_id: message.id,
                reply_to_message_sender_id: message.sender_id,
                reply_to_message_sender_first_name: message.sender_first_name,
                reply_to_message_sender_last_name: message.sender_last_name,
                reply_to_message_text: message.text
            }, roomId: message.room_id
        }));
    };

    type AnimatedGHContext = {
        startX: number;
    };

    const translation = {
        x: useSharedValue(0),
    };

    const { width } = Dimensions.get("window");

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translation.x.value
                }
            ]
        };
    });

    const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, AnimatedGHContext>({
        onStart: (_, ctx) => {
            ctx.startX = translation.x.value;
        },
        onActive: (event, ctx) => {
            let calculatedX = ctx.startX + event.translationX * 0.5;
            let distance = (calculatedX - ctx.startX) * (fromSelf ? -1 : 1);

            if (distance > 0 && distance < width / 2) {
                translation.x.value = calculatedX;
            }
        },
        onEnd: (event, ctx) => {
            const calculatedX = ctx.startX + event.translationX * 0.5;
            const distance = Math.abs(calculatedX - ctx.startX);

            if (distance > width / 2 - 100) {
                runOnJS(setReplyToEvent)();
            }

            translation.x.value = withTiming(0);
        },
    });

    return {
        animatedStyles,
        gestureHandler,
    };
};
