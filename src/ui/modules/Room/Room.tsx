import React, { useEffect } from 'react';
import { NavigationProp } from '@react-navigation/core';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Bottombar } from './Bottombar/Bottombar';
import { MessageList } from './MessageList/MessageList';
import { RoomTopbar } from './RoomTopbar/RoomTopbar';
import { useInitRoom } from './useInitRoom';
import { RoomPresenceList } from './RoomPresenceList/RoomPresenceList';
import { invalid } from 'moment';

interface IProps {
    roomId: number;
    navigation: NavigationProp<any, any>;
}

export const Room = ({ roomId, navigation }: IProps) => {
    const { id, isInvalid, roomSocket, } = useInitRoom(roomId);

    if (isInvalid || !roomSocket || id === 0) {
        return (
            <View style={styles.container}>
                <Text>Waiting...</Text>
            </View>
        );
    }

    console.log("room rerender");

    return (
        <View style={styles.container}>
            <RoomTopbar
                roomId={roomId}
                navigation={navigation}
            />
            <MessageList roomId={roomId} />

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
