import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AppStyles from '../AppStyles';
import { LoadScreen, WalkthroughScreen } from '../Core/onboarding';
import MainStackNavigator from './MainStackNavigator';
import LoginStack from './AuthStackNavigator';
import SocialNetworkConfig from '../SocialNetworkConfig';

const Root = createStackNavigator();
const RootNavigator = () => {
  return (
    <Root.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      initialRouteName="LoadScreen">
      <Root.Screen
        initialParams={{
          appStyles: AppStyles,
          appConfig: SocialNetworkConfig,
        }}
        name="LoadScreen"
        component={LoadScreen}
      />
      <Root.Screen name="Walkthrough" component={WalkthroughScreen} />
      <Root.Screen name="LoginStack" component={LoginStack} />
      <Root.Screen name="MainStack" component={MainStackNavigator} />
    </Root.Navigator>
  );
};

export default RootNavigator;
