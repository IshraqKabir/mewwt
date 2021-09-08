import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../../consts/storageConsts";

export const setToken = (token: string) => {
    try {
        AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
    }
};