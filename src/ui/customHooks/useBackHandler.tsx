import { useEffect } from "react";
import { BackHandler } from "react-native";
import { HARDWARE_BACK_PRESS } from "../../app/consts/appConsts";

export const useBackHandler = (handleBack: Function) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            HARDWARE_BACK_PRESS,
            () => {
                handleBack();
                return true;
            }
        );

        return () => backHandler.remove();
    }, []);
};
