import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './constants/theme';
import RootStackNavigator from './navigation/RootStackNavigator';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './store/store';
import {LogBox} from 'react-native';

const App = ({displayNotification}) => {
  LogBox.ignoreLogs(['Require cycle:']);
  LogBox.ignoreLogs(['EventEmitter.removeListener', 'onAnimatedValueUpdate']);

  return (
    // <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <RootStackNavigator />
      </PaperProvider>
    // </ReduxProvider>
  );
};

export default App;
