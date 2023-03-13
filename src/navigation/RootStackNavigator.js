import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';
import {theme} from '../constants/theme';
import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_OTP_SCREEN,
} from './routes';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import OTPScreen from '../screens/OTPScreen';
import AppAsyncStorage from '../utils/AppAsyncStorage';

const AuthenticationStack = createNativeStackNavigator();
const AuthenticatedStack = createNativeStackNavigator();

const authenticationRoute = () => (
  <AuthenticationStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AuthenticationStack.Screen
      name={NAVIGATION_TO_LOGIN_SCREEN}
      component={LoginScreen}
      options={{header: () => null}}
    />
    <AuthenticationStack.Screen
      name={NAVIGATION_TO_OTP_SCREEN}
      component={OTPScreen}
      options={{header: () => null}}
    />
  </AuthenticationStack.Navigator>
);

const authenticatedRoute = () => (
  <AuthenticatedStack.Navigator>
    <AuthenticatedStack.Screen
      name={NAVIGATION_TO_HOME_SCREEN}
      component={HomeScreen}
      options={{header: () => null}}
    />
  </AuthenticatedStack.Navigator>
);

const RootStackNavigator = ({navigation}) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        {false ? authenticatedRoute() : authenticationRoute()}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styleSheet = StyleSheet.create({
  headerTitle: {
    color: theme.colors.standardWhite,
    ...theme.typography.heading4,
  },
});

const makeStyles = ({colors, typography}) =>
  ScaledSheet.create({
    applyFilterClearButton: {
      ...typography.body1JostMedium,
      color: colors.standardLightBlue,
    },
    customBackButton: {
      marginLeft: '20@ms',
    },
    clearViewFilter: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: '10@ms',
    },
    headerTextAlign: 'center',
    gestureDirectionHorizontal: 'horizontal',
    gestureDirectionHorizontalInverted: 'horizontal-inverted',
  });

export default RootStackNavigator;
