import "react-native-gesture-handler";
import React from "react";
import { AppNavContainer } from "./app/navigation/AppNavContainer";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

import * as Sentry from "@sentry/react-native";

Sentry.init({
    dsn: "https://f923276664a74b89bfc9be9f5a44b099@o991915.ingest.sentry.io/5949148",
    enableNative: false,
});

const App = () => {
    return (
        <Provider store={store}>
            <AppNavContainer />
        </Provider>
    );
};

export default App;
