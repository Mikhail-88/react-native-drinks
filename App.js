import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { Alert  } from 'react-native';

import { fonts } from './src/fonts';
import { AppNavigation } from './src/navigation/AppNavigation';
import { store } from './src/redux/store';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={fonts}
        onError={() => Alert.alert('Something went wrong, try again later!')}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};