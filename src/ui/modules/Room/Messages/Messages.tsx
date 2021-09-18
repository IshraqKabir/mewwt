import React from "react";
import { Dimensions, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/redux/store";
import { IRoom } from "../../../../app/types/IRoom";
import { BACKGROUND_COLOR } from "../../../../consts";
import { MessageList } from "./MessagesList/MessageList";

interface IProps {
    roomId: number;
    authUserId: number;
    isGroup: boolean;
}

export const Messages = ({ roomId, authUserId, isGroup }: IProps) => {
    const { messages, isFetchingNewMessages } = useSelector((state: RootState) => {
        return state.rooms.rooms.filter(room => room.id === roomId)[0];
    }, (next: IRoom, prev: IRoom) => {
        if (next.messages.length !== prev.messages.length) {
            return false;
        }

        if (next.isFetchingNewMessages !== prev.isFetchingNewMessages) {
            return false;
        }

        return true;
    });

    if (messages.length === 0) {
        return <View style={{ flexGrow: 2, alignItems: "center" }} >
            <Text style={{ marginTop: Dimensions.get("window").height / 2 - 100 }}>No messages yet...</Text>
        </View>;
    }

    console.log("flat list parent has rendered");

    return <View style={{ flexGrow: 2, backgroundColor: BACKGROUND_COLOR }}>
        {isFetchingNewMessages ?
            <View style={{ backgroundColor: "transparent", alignContent: "center", }}>
                <Text style={{ color: "black", fontWeight: "bold", textAlign: "center", margin: 5 }}>
                    Getting New Messages...
                </Text>
            </View>
            : null}

        <MessageList
            messages={messages}
            roomId={roomId}
            authUserId={authUserId}
            isGroup={isGroup}
            isFetchingNewMessages={!!isFetchingNewMessages}
        />
    </View>;
};
