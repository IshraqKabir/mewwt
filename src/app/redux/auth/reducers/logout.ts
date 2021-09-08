import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../../../consts/storageConsts";
import { IAuthState } from "../types";

export const logout = (state: IAuthState) => {
    state.authToken = "";
    state.user = null;
    state.chatMates = [];

    AsyncStorage.setItem(TOKEN_KEY, "");
};
