import React, { memo } from "react";
import { FlatList } from "react-native-gesture-handler";
import { IMessage } from "../../../../../app/types/IMessage";
import { Message } from "../../../../components/Message/Message";
import { useMessageFlatList } from "./useMessageFlatList";

interface IProps {
    messages: IMessage[];
    roomId: number;
    authUserId: number;
    isGroup: boolean;
    isFetchingNewMessages: boolean;
}

export const MessageList = memo(({ messages, roomId, authUserId, isGroup }: IProps) => {
    const {
        handlePagination,
        handleReplyToClick,
        keyExtractor,
        onScrollToIndexFailed,
        setRef,
        onViewableItemsChanged,
    } = useMessageFlatList(roomId, messages);

    const renderItem = ({ item: message, index }: { item: any, index: number; }) => (
        <Message
            index={index}
            message={message}
            authUserId={authUserId}
            allMessages={messages}
            isGroup={isGroup}
            handleReplyToClick={handleReplyToClick}
        />
    );

    return <FlatList
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{ height: "1%" }}
        inverted={true}
        onEndReached={handlePagination}
        onEndReachedThreshold={1}
        ref={setRef}
        maxToRenderPerBatch={50}
        onScrollToIndexFailed={onScrollToIndexFailed}
        onViewableItemsChanged={onViewableItemsChanged}
    />;
}, (prev, next) => {
    if (prev.messages.length !== next.messages.length) {
        return false;
    };

    return true;
});
