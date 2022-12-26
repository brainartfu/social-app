import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  InnerFeedNavigator,
  InnerChatSearchNavigator,
  InnerFriendsSearchNavigator,
  InnerDiscoverNavigator,
  InnerProfileNavigator,
} from './InnerStackNavigators';
import { TabBarBuilder } from '../Core/ui';
import SocialNetworkConfig from '../SocialNetworkConfig';
import AppStyles from '../AppStyles';

const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        title: route.name,
      })}
      tabBar={({ state, route, navigation }) => (
        <TabBarBuilder
          tabIcons={SocialNetworkConfig.tabIcons}
          appStyles={AppStyles}
          route={route}
          state={state}
          navigation={navigation}
        />
      )}
      initialRouteName="Feed">
      <BottomTab.Screen name="Feed" component={InnerFeedNavigator} />
      <BottomTab.Screen name="Discover" component={InnerDiscoverNavigator} />
      <BottomTab.Screen name="Chat" component={InnerChatSearchNavigator} />
      <BottomTab.Screen
        name="Friends"
        component={InnerFriendsSearchNavigator}
      />
      <BottomTab.Screen name="Profile" component={InnerProfileNavigator} />
    </BottomTab.Navigator>
  );
};
export default BottomTabNavigator;
