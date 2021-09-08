import { NavigationProp, useRoute } from "@react-navigation/core";
import React from "react";
import { Text, View } from "react-native";
import { Room } from "../../../modules/Room/Room";

interface IProps {
    navigation: NavigationProp<any, any>;
}

export const RoomScreen = ({ navigation }: IProps) => {
    const params = useRoute().params as any;

    if (!params?.room_id) {
        return (
            <View>
                <Text>No room id found</Text>
            </View>
        );
    }

    return (
        <View>
            <Room roomId={params?.room_id} navigation={navigation} />
        </View>
    );
};
