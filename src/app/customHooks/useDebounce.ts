import { useEffect, useState } from "react";

export const useDebounce = <T>(initialValue: T, startCallBack: Function, finishCallBack: Function, delayInMs: number) => {
    const [value, setValue] = useState<T>(initialValue);
    const [isOngoing, setIsOngoing] = useState(false);
    const [prevTimeout, setPrevTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!value) return;

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
