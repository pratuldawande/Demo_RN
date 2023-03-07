import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';
import {theme} from '../constants/theme';
import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_TO_ONBOARDING_SCREEN,
  NAVIGATION_TO_OTP_SCREEN,
} from './routes';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OTPScreen from '../screens/OTPScreen';
import AppAsyncStorage from '../utils/AppAsyncStorage';
import {showOnboardingKey} from '../constants/StringConstants';

const AuthenticationStack = createNativeStackNavigator();
const AuthenticatedStack = createNativeStackNavigator();

const authenticationRoute = initialScreen => (
  <AuthenticationStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {initialScreen && (
      <AuthenticationStack.Screen
        name={NAVIGATION_TO_ONBOARDING_SCREEN}
        component={OnboardingScreen}
        options={{header: () => null}}
      />
    )}
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
  const {colors, typography} = useTheme();
  const styles = makeStyles({colors, typography});
  const [isOnboarding, setIsOnboarding] = useState(true);

  useEffect(() => {
    checkShowOnboarding();
  }, []);

  const checkShowOnboarding = async () => {
    const showOnboarding = await AppAsyncStorage.getValue(showOnboardingKey);
    if (JSON.parse(showOnboarding)) {
      setIsOnboarding(false);
    }
  };

  const CustomBackButton = ({navigation}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.customBackButton}>
        <AntDesign
          name={'arrowleft'}
          size={24}
          color={theme.colors.standardWhite}
        />
      </TouchableOpacity>
    );
  };

  // const config = {
  //     animation: screenAnimationType,
  //     config: {
  //         duration: 350
  //     },
  // };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        {false ? authenticatedRoute() : authenticationRoute(isOnboarding)}
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
