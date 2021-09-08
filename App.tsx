import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import * as Sentry from '@sentry/react-native';
import {Provider} from 'react-redux';
import {store} from './src/app/redux/store';
import {AppNavContainer} from './src/app/navigation/AppNavContainer';

Sentry.init({
  dsn: 'https://30667da573964c4cb606ba7dcb69c4ab@o991915.ingest.sentry.io/5950954',
});

const App = () => {
  return (
    <Provider store={store}>
      <AppNavContainer />
    </Provider>
  );
};

export default App;
