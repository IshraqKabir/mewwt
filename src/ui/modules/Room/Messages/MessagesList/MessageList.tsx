import React, { memo, useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { incrementPage } from "../../../../../app/redux/rooms/roomsActions";
import { IMessage } from "../../../../../app/types/IMessage";
import { hasChatMatesChanged } from "../../../../../app/utils/hasChatMatesChanged";
import { Message } from "../../../../components/Message/Message";

interface IProps {
    messages: IMessage[];
    roomId: number;
    authUserId: number;
    isGroup: boolean;
    isFetchingNewMessages: boolean;
}

export const MessageList = memo(({ messages, roomId, authUserId, isGroup }: IProps) => {
    const dispatch = useDispatch();

    const keyExtractor = (message: any) => message.id;

    const renderItem = ({ item: message, index }: { item: any, index: number; }) => (
        <Message
            index={index}
            message={message}
            authUserId={authUserId}
            allMessages={messages}
            isGroup={isGroup}
        />
    );

    const handlePagination = () => {
        dispatch(incrementPage({ roomId: roomId }));
    };

    console.log("flat list render");

    return <FlatList
        data={messages}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={{ height: "1%" }}
        inverted={true}
        onEndReached={handlePagination}
        onEndReachedThreshold={1}
    />;
}, (prev, next) => {
    if (prev.messages.length !== next.messages.length) {
        return false;
    };

    return true;
});
