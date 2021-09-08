import { useState, useEffect } from "react";
import { IChatMate } from "../../../app/types/IChatMate";
import { IUser } from "../../../app/types/IUser";
import { getMomentTime } from "../../../app/utils/getMomentTime";
import { isRoomActive } from "../../../app/utils/isRoomActive";
import { pluck } from "../../../app/utils/pluck";

const OFFLINE = "";
const GROUP_OFFLINE = "No one is active";

export const useRoomActivityStatus = (
    roomUsers: IUser[],
    is_group: boolean,
    user: IUser | null,
    chatMates: IChatMate[] | null
) => {
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!user || !chatMates) return;

        if (is_group) {
            handleGroupActivityStatus(
                roomUsers,
                chatMates,
                user?.id ?? 0,
                setStatus
            );
        } else {
            handleDirectMessageActivityStatus(
                roomUsers,
                chatMates,
                user?.id ?? 0,
                setStatus
            );
        }
    }, [user, chatMates, roomUsers]);

    return { status };
};

const getGroupOnlineText = (chatMates: IChatMate[]): string => {
    const onlineChatMates: IChatMate[] = chatMates.filter((chatMate) => {
        return !!chatMate.onlineStatus?.isOnline;
    });

    if (onlineChatMates.length === 0) {
        return GROUP_OFFLINE; // this should not happen. done for safety measurue
    } else if (onlineChatMates.length > 0 && onlineChatMates.length < 4) {
        return `${pluck<IChatMate>(onlineChatMates, "first_name").join(", ")} ${
            onlineChatMates.length > 1 ? "are" : "is"
        } online`;
    } else if (onlineChatMates.length > 3) {
        return `${pluck<IChatMate>(
            onlineChatMates.slice(0, 1),
            "first_name"
        ).join(", ")} and others are online`;
    }

    return GROUP_OFFLINE;
};

const getLastSeen = (
    chatMates: IChatMate[],
    roomUsers: IUser[],
    authUserId: number = 0
) => {
    const roomUser = roomUsers.filter((roomUser) => {
        return roomUser.id !== authUserId;
    })[0];

    if (roomUser) {
        const lastSeen = chatMates.find(
            (chatMate) => chatMate.id === roomUser.id
        )?.onlineStatus?.lastSeen;

        return lastSeen;
    }
};

const handleGroupActivityStatus = (
    roomUsers: IUser[],
    chatMates: IChatMate[],
    authUserId: number,
    setStatus: Function
) => {
    const isActive = isRoomActive(roomUsers, chatMates, authUserId);

    if (isActive) {
        setStatus(getGroupOnlineText(chatMates));
    } else {
        setStatus(GROUP_OFFLINE);
    }
};

const handleDirectMessageActivityStatus = (
    roomUsers: IUser[],
    chatMates: IChatMate[],
    authUserId: number,
    setStatus: Function
) => {
    if (isRoomActive(roomUsers, chatMates, authUserId)) {
        setStatus("Online");
    } else {
        const lastSeen = getLastSeen(chatMates, roomUsers, authUserId);

        if (lastSeen) {
            setStatus(getMomentTime(lastSeen));
        } else {
            setStatus(OFFLINE);
        }
    }
};
