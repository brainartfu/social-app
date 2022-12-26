import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import IMDrawerMenu from '../Core/ui/drawer/IMDrawerMenu/IMDrawerMenu';
import {
  InnerFeedNavigator,
  InnerChatSearchNavigator,
  InnerFriendsSearchNavigator,
  InnerDiscoverNavigator,
  InnerProfileNavigator,
} from './InnerStackNavigators';
import AppStyles from '../AppStyles.js';
import { authManager } from '../Core/onboarding/utils/api';
import SocialNetworkConfig from '../SocialNetworkConfig';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        title: route.key,
      })}
      initialRouteName="Feed"
      drawerStyle={{ width: 300 }}
      drawerPosition="left"
      drawerContent={({ navigation }) => (
        <IMDrawerMenu
          navigation={navigation}
          menuItems={SocialNetworkConfig.drawerMenu.upperMenu}
          menuItemsSettings={SocialNetworkConfig.drawerMenu.lowerMenu}
          appStyles={AppStyles}
          authManager={authManager}
          appConfig={SocialNetworkConfig}
        />
      )}>
      <Drawer.Screen name="Feed" component={InnerFeedNavigator} />
      <Drawer.Screen name="Discover" component={InnerDiscoverNavigator} />
      <Drawer.Screen name="Chat" component={InnerChatSearchNavigator} />
      <Drawer.Screen name="Friends" component={InnerFriendsSearchNavigator} />
      <Drawer.Screen name="Profile" component={InnerProfileNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
