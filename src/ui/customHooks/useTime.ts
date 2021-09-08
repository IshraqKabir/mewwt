import { useEffect, useState } from "react";
import { getMomentTime, getTimeDiff } from "../../app/utils/getMomentTime";

export const useTime = (timeString: string) => {
    const [time, setTime] = useState(getMomentTime(timeString));

    useEffect(() => {
        const interval = getInterval(getTimeDiff(timeString));

        let timer: NodeJS.Timer;
        if (interval !== null) {
            timer = setInterval(() => {
                setTime(getMomentTime(timeString));
            }, interval);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, []);

    useEffect(() => {
        setTime(getMomentTime(timeString));
    }, [timeString]);

    return {
        time,
    };
};

const getInterval = (diffInMintues: number) => {
    if (diffInMintues < 60) {
        return 1000 * 60;
    } else {
        return null;
    }
};
