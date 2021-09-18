import React, { memo, useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { incrementPage } from "../../../../../app/redux/rooms/roomsActions";
import { IMessage } from "../../../../../app/types/IMessage";
import { Message } from "../../../../components/Message/Message";
import { useScrollToReply } from "./useScrollToReply";

interface IProps {
    messages: IMessage[];
    roomId: number;
    authUserId: number;
    isGroup: boolean;
    isFetchingNewMessages: boolean;
}

export const MessageList = memo(({ messages, roomId, authUserId, isGroup }: IProps) => {
    const dispatch = useDispatch();

    const { flatListRef, handleReplyToClick } = useScrollToReply(messages);

    const keyExtractor = (message: any) => message.id;

    const handlePagination = () => {
        dispatch(incrementPage({ roomId: roomId }));
    };

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
        ref={(item) => {
            flatListRef.current = item;
        }}
    />;
}, (prev, next) => {
    if (prev.messages.length !== next.messages.length) {
        return false;
    };

    return true;
});
