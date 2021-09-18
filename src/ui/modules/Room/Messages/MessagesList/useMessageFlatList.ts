import { useCallback, useRef } from "react";
import { FlatList, ViewToken } from "react-native";
import { useDispatch } from "react-redux";
import { incrementPage } from "../../../../../app/redux/rooms/roomsActions";
import { IMessage } from "../../../../../app/types/IMessage";
import { useScrollToReply } from "./useScrollToReply";

export const useMessageFlatList = (roomId: number, messages: IMessage[]) => {
    const dispatch = useDispatch();

    // using ref to prevent rerender of flatlist
    const scrollingToIndex = useRef<number | null>(null);

    const { flatListRef, handleReplyToClick } = useScrollToReply(messages, roomId);

    const keyExtractor = (message: any) => message.id;

    const handlePagination = () => {
        dispatch(incrementPage({ roomId: roomId }));
    };

    const onScrollToIndexFailed = ({
        index,
        averageItemLength,
        highestMeasuredFrameIndex
    }: {
        index: number,
        highestMeasuredFrameIndex: number,
        averageItemLength: number;
    }) => {
        flatListRef.current?.scrollToOffset({
            offset: averageItemLength * (highestMeasuredFrameIndex),
            animated: true,
        });

        scrollingToIndex.current = index;
    };

    const onViewableItemsChanged = useCallback(
        ({ viewableItems, changed }: { viewableItems: ViewToken[]; changed: ViewToken[]; }) => {
            if (scrollingToIndex.current) {
                if (!viewableItems.filter(item => item.index === scrollingToIndex.current)[0]) {
                    flatListRef.current?.scrollToIndex({ index: scrollingToIndex.current, animated: true });
                } else {
                    scrollingToIndex.current = null;
                }
            }
        }, []
    );

    const setRef = (item: FlatList<any> | null) => {
        flatListRef.current = item;
    };

    return {
        handlePagination,
        handleReplyToClick,
        keyExtractor,
        onScrollToIndexFailed,
        setRef,
        onViewableItemsChanged,
    };
};
