import { Dimensions } from "react-native";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, runOnJS, withTiming } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { setReplyTo } from "../../../app/redux/rooms/roomsActions";
import { IMessage } from "../../../app/types/IMessage";

export const useMessageReply = (message: IMessage) => {
    const dispatch = useDispatch();

    const setReplyToEvent = () => {
        dispatch(setReplyTo({ message: message, roomId: message.room_id }));
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
            let distance = (calculatedX - ctx.startX) * (message.fromSelf ? -1 : 1);

            if (distance > 0 && distance < width / 2) {
                translation.x.value = calculatedX;
            }
        },
        onEnd: (event, ctx) => {
            const calculatedX = ctx.startX + event.translationX * 0.5;
            const distance = calculatedX - ctx.startX;

            if ((message.fromSelf && distance < width / 2 - 100) || (!message.fromSelf && distance > width / 2 - 100)) {
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
