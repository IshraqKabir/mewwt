import { useEffect, useRef } from "react";

export const useUpdateEffect = (callBack: Function, dependencies: any[]) => {
    const firstRenderRef = useRef(true);

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }

        callBack();
    }, dependencies);
};
