import { useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";

export const useUpdateDebounce = <T>(initialValue: T, startCallBack: Function, finishCallBack: Function, delayInMs: number) => {
    const [value, setValue] = useState<T>(initialValue);
    const [isOngoing, setIsOngoing] = useState(false);
    const [prevTimeout, setPrevTimeout] = useState<NodeJS.Timeout | null>(null);

    useUpdateEffect(() => {
        if (!isOngoing) {
            startCallBack();
        }

        setIsOngoing(true);

        const timeout = setTimeout(() => {
            finishCallBack();
            setIsOngoing(false);
        }, delayInMs);

        if (prevTimeout) clearTimeout(prevTimeout);

        setPrevTimeout(timeout);
    }, [value]);

    return {
        value,
        setValue
    };
};
