import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './constants/theme';
import RootStackNavigator from './navigation/RootStackNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';

const App = () => {
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
