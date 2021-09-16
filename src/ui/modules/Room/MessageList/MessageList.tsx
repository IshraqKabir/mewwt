import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../../app/redux/auth/selectors/authSelector";
import { incrementPage } from "../../../../app/redux/rooms/roomsActions";
import { singleRoomSelector } from "../../../../app/redux/rooms/selectors/singleRoomSelector";
import { RootState } from "../../../../app/redux/store";
import { IMessage } from "../../../../app/types/IMessage";
import { isMessageUserActive } from "../../../../app/utils/isMessageUserActive";
import { messageHasNextFromSameSender } from "../../../../app/utils/messageHasNextFromSameSender";
import { messageHasPrevFromSameSender } from "../../../../app/utils/messageHasPrevFromSameSender";
import { parseMessageSender } from "../../../../app/utils/parseMessageSender";
import { BACKGROUND_COLOR } from "../../../../consts";
import { Message } from "../../../components/Message/Message";
import { MessageListFooter } from "../MessageListFooter/MessageListFooter";

interface IProps {
    roomId: number;
}

export const MessageList = ({ roomId }: IProps) => {
    const { user: currentUser, chatMates } = useSelector(authSelector);
    const { users: roomUsers, isFetchingNewMessages, messages } = useSelector(
        (state: RootState) => {
            return singleRoomSelector(state, roomId);
        }
    );

    const dispatch = useDispatch();

    const handlePagination = () => {
        // we are just incrementing the page number
        // the fetching will be called from useRoomMessagesMisc
        // once the page is incremented and conditions met
        dispatch(incrementPage({ roomId: roomId }));
    };

    const messagesLength = messages.length;
    const showSenderName = roomUsers?.length ? roomUsers.length > 2 : false;

    if (messages.length === 0) {
        return <View><Text>No Messages yet</Text></View>;
    }

    console.log("flatlist rerender");

    const renderItem = ({ item, index }: { item: any, index: number; }) => {
        let message = parseMessageSender(
            item,
            roomUsers,
            currentUser
        );
        message.is_read =
            (message.readerIds?.filter((id) => id !== null)
                .length || 0) > 0;

        return (
            <Message
                key={message.id}
                message={message}
                isUserOnline={isMessageUserActive(
                    message.sender_id ?? 0,
                    chatMates
                )}
                hasPrevFromSameSender={
                    index === 0
                        ? false
                        : messageHasPrevFromSameSender(
                            message,
                            messages[index - 1]
                        )
                }
                hasNextFromSameSender={
                    index === messagesLength - 1
                        ? false
                        : messageHasNextFromSameSender(
                            message,
                            messages[index + 1]
                        )
                }
                showSenderName={showSenderName}
                authUserId={currentUser?.id ?? 0}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages ?? []}
                keyExtractor={(message) => message.id}
                renderItem={renderItem}
                inverted={true}
                onEndReached={handlePagination}
                onEndReachedThreshold={0}
                ListEmptyComponent={
                    <Text
                        style={{
                            textAlign: "center",
                            textAlignVertical: "center",
                        }}
                    >
                        No Messages In This Conversation yet :(
                    </Text>
                }
                ListFooterComponent={
                    <MessageListFooter
                        show={
                            isFetchingNewMessages
                                ? isFetchingNewMessages
                                : false
                        }
                    />
                }
                ListFooterComponentStyle={{ padding: 15 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 2,
        height: "1%",
        backgroundColor: BACKGROUND_COLOR,
    },
});
