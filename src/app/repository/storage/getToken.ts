import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../../consts/storageConsts";

export const getToken = async (): Promise<string> => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return token ? token : "";
    } catch (error) {
        return "";
    }
};
