import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './constants/theme';
import RootStackNavigator from './navigation/RootStackNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {LogBox} from 'react-native';

const App = ({displayNotification}) => {
  // LogBox.ignoreLogs(['Require cycle:']);
  // LogBox.ignoreLogs(['EventEmitter.removeListener', 'onAnimatedValueUpdate']);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <RootStackNavigator />
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;
