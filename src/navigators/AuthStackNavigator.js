import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  WelcomeScreen,
  LoginScreen,
  SignupScreen,
  SmsAuthenticationScreen,
  ResetPasswordScreen,
} from '../Core/onboarding';
import { authManager } from '../Core/onboarding/utils/api';
import AppStyles from '../AppStyles';
import SocialNetworkConfig from '../SocialNetworkConfig';
import { StyleSheet } from 'react-native';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
        cardShadowEnabled: false,
        headerShown: false,
      }}
      initialRouteName="Welcome">
      <AuthStack.Screen
        initialParams={{
          appStyles: AppStyles,
          appConfig: SocialNetworkConfig,
          authManager: authManager,
        }}
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="Login"
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="Signup"
        component={SignupScreen}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="Sms"
        component={SmsAuthenticationScreen}
      />
      <AuthStack.Screen
        options={{ headerStyle: styles.headerStyle }}
        name="ResetPassword"
        component={ResetPasswordScreen}
        initialParams={{
          appStyles: AppStyles,
          appConfig: SocialNetworkConfig,
          authManager: authManager,
        }}
      />
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0, // remove shadow on Android
  },
});

export default AuthStackNavigator;
