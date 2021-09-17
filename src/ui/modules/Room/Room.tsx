import React, { useEffect } from 'react';
import { NavigationProp } from '@react-navigation/core';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Bottombar } from './Bottombar/Bottombar';
import { MessageListOld } from './MessageListOld/MessageListOld';
import { RoomTopbar } from './RoomTopbar/RoomTopbar';
import { useInitRoom } from './useInitRoom';
import { RoomPresenceList } from './RoomPresenceList/RoomPresenceList';
import { Messages } from './Messages/Messages';

interface IProps {
    roomId: number;
    navigation: NavigationProp<any, any>;
}

export const Room = ({ roomId, navigation }: IProps) => {
    const { id, isInvalid, roomSocket, user, chatMates, isGroup } = useInitRoom(roomId);

    if (isInvalid || !roomSocket || id === 0) {
        return (
            <View style={styles.container}>
                <Text>Waiting...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <RoomTopbar
                roomId={roomId}
                navigation={navigation}
            />
            <Messages
                roomId={roomId}
                authUserId={user?.id ?? 0}
                chatMates={chatMates}
                isGroup={isGroup}
            />

            <RoomPresenceList roomId={roomId} />

            <Bottombar roomId={roomId} roomSocket={roomSocket} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
