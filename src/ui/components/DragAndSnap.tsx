import React from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

export function DragAndSnap(): React.ReactElement {
    const { width } = Dimensions.get('window');

    const translation = {
        x: useSharedValue(0),
        y: useSharedValue(0),
    };
    type AnimatedGHContext = {
        startX: number;
        startY: number;
    };
    const gestureHandler = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        AnimatedGHContext
    >({
        onStart: (_, ctx) => {
            ctx.startX = translation.x.value;
        },
        onActive: (event, ctx) => {
            const calculatedX = ctx.startX + event.translationX;
            const distance = calculatedX - ctx.startX;

            if (distance > 0 && distance < width / 2) {
                translation.x.value = calculatedX;
            }
        },
        onEnd: (event, ctx) => {
            const calculatedX = ctx.startX + event.translationX;
            const distance = calculatedX - ctx.startX;

            if (distance > width / 2 - 50) {
                // console.log("yes");
            }

            translation.x.value = withSpring(0);
        },
    });

    const stylez = useAnimatedStyle(() => {
        const H = Math.round(
            interpolate(translation.x.value, [0, 300], [0, 360], Extrapolate.CLAMP)
        );
        const S = Math.round(
            interpolate(translation.y.value, [0, 500], [100, 50], Extrapolate.CLAMP)
        );
        const backgroundColor = `hsl(${H},${S}%,50%)`;
        return {
            transform: [
                {
                    translateX: translation.x.value,
                },
                {
                    translateY: translation.y.value,
                },
            ],
            backgroundColor,
        };
    });

    return (
        <View style={{ flex: 1, margin: 50 }}>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[
                        {
                            width: 40,
                            height: 40,
                        },
                        stylez,
                    ]}
                />
            </PanGestureHandler>
        </View>
    );
}
