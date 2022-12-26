import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  FeedScreen,
  DetailPostScreen,
  CreatePostScreen,
  DiscoverScreen,
  ProfileScreen,
  ChatScreen,
} from '../screens';
import { IMCreateGroupScreen } from '../Core/chat';
import {
  IMFriendsScreen,
  IMAllFriendsScreen,
  IMUserSearchModal,
} from '../Core/socialgraph/friendships';
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
  IMProfileSettingsScreen,
  IMBlockedUsersScreen,
} from '../Core/profile';
import { IMNotificationScreen } from '../Core/notifications';
import AppStyles from '../AppStyles';
import SocialNetworkConfig from '../SocialNetworkConfig';
import { IMLocalized } from '../Core/localization/IMLocalization';
import { Platform } from 'react-native';

const InnerStack = createStackNavigator();
const InnerFeedNavigator = () => {
  return (
    <InnerStack.Navigator initialRouteName="Feed" headerMode="float">
      <InnerStack.Screen name="Feed" component={FeedScreen} />
      <InnerStack.Screen name="FeedDetailPost" component={DetailPostScreen} />
      <InnerStack.Screen name="CreatePost" component={CreatePostScreen} />
      <InnerStack.Screen name="FeedProfile" component={ProfileScreen} />
      <InnerStack.Screen
        name="FeedNotification"
        component={IMNotificationScreen}
      />
      <InnerStack.Screen
        name="FeedProfileSettings"
        component={IMProfileSettingsScreen}
      />
      <InnerStack.Screen
        name="FeedEditProfile"
        component={IMEditProfileScreen}
      />
      <InnerStack.Screen
        name="FeedAppSettings"
        component={IMUserSettingsScreen}
      />
      <InnerStack.Screen name="FeedContactUs" component={IMContactUsScreen} />
      <InnerStack.Screen name="FeedAllFriends" component={IMAllFriendsScreen} />
      <InnerStack.Screen
        name="FeedProfilePostDetails"
        component={DetailPostScreen}
      />
    </InnerStack.Navigator>
  );
};

const ChatSearch = createStackNavigator();
const InnerChatSearchNavigator = () => {
  return (
    <ChatSearch.Navigator
      mode="modal"
      initialRouteName="Main"
      headerMode="float">
      <ChatSearch.Screen
        name="Main"
        component={InnerChatNavigator}
        options={{ headerShown: false }}
      />
      <ChatSearch.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </ChatSearch.Navigator>
  );
};

const InnerChat = createStackNavigator();
const InnerChatNavigator = () => {
  return (
    <InnerChat.Navigator initialRouteName="Chat" headerMode="float">
      <InnerChat.Screen name="Chat" component={ChatScreen} />
      <InnerChat.Screen name="CreateGroup" component={IMCreateGroupScreen} />
    </InnerChat.Navigator>
  );
};

const FriendsSearch = createStackNavigator();
const InnerFriendsSearchNavigator = () => {
  return (
    <FriendsSearch.Navigator
      mode="modal"
      initialRouteName="Main"
      headerMode="float">
      <FriendsSearch.Screen
        name="Main"
        component={InnerFriendsNavigator}
        options={{ headerShown: false }}
      />
      <FriendsSearch.Screen
        name="UserSearchScreen"
        component={IMUserSearchModal}
        options={{ headerShown: false }}
      />
    </FriendsSearch.Navigator>
  );
};

const InnerFriends = createStackNavigator();
const InnerFriendsNavigator = () => {
  return (
    <InnerFriends.Navigator headerMode="float" initialRouteName="Friends">
      <InnerFriends.Screen
        initialParams={{
          appStyles: AppStyles,
          appConfig: SocialNetworkConfig,
          followEnabled: false,
          friendsScreenTitle: IMLocalized('Friends'),
          showDrawerMenuButton: Platform.OS == 'android',
        }}
        name="Friends"
        component={IMFriendsScreen}
      />
      <InnerFriends.Screen name="FriendsProfile" component={ProfileScreen} />
      <InnerFriends.Screen
        name="FriendsAllFriends"
        component={IMAllFriendsScreen}
      />
    </InnerFriends.Navigator>
  );
};

const InnerDiscover = createStackNavigator();
const InnerDiscoverNavigator = () => {
  return (
    <InnerDiscover.Navigator initialRouteName="Discover" headerMode="float">
      <InnerDiscover.Screen name="Discover" component={DiscoverScreen} />
      <InnerDiscover.Screen
        name="DiscoverDetailPost"
        component={DetailPostScreen}
      />
      <InnerDiscover.Screen name="DiscoverProfile" component={ProfileScreen} />
      <InnerDiscover.Screen
        name="DiscoverNotification"
        component={IMNotificationScreen}
      />
      <InnerDiscover.Screen
        name="DiscoverProfileSettings"
        component={IMProfileSettingsScreen}
      />
      <InnerDiscover.Screen
        name="DiscoverEditProfile"
        component={IMEditProfileScreen}
      />
      <InnerDiscover.Screen
        name="DiscoverAppSettings"
        component={IMUserSettingsScreen}
      />
      <InnerDiscover.Screen
        name="DiscoverContactUs"
        component={IMContactUsScreen}
      />
      <InnerDiscover.Screen
        name="DiscoverAllFriends"
        component={IMAllFriendsScreen}
      />
      <InnerDiscover.Screen
        name="DiscoverProfilePostDetails"
        component={DetailPostScreen}
      />
    </InnerDiscover.Navigator>
  );
};

// working
const InnerProfile = createStackNavigator();
const InnerProfileNavigator = () => {
  return (
    <InnerProfile.Navigator initialRouteName="Profile" headerMode="float">
      <InnerProfile.Screen name="Profile" component={ProfileScreen} />
      <InnerProfile.Screen
        name="ProfileNotification"
        component={IMNotificationScreen}
      />
      <InnerProfile.Screen
        name="ProfileProfileSettings"
        component={IMProfileSettingsScreen}
      />
      <InnerProfile.Screen
        name="ProfileBlockedSettings"
        component={IMBlockedUsersScreen}
      />
      <InnerProfile.Screen
        name="ProfileEditProfile"
        component={IMEditProfileScreen}
      />
      <InnerProfile.Screen
        name="ProfileAppSettings"
        component={IMUserSettingsScreen}
      />
      <InnerProfile.Screen
        name="ProfileContactUs"
        component={IMContactUsScreen}
      />
      <InnerProfile.Screen
        name="ProfileAllFriends"
        component={IMAllFriendsScreen}
      />
      <InnerProfile.Screen
        name="ProfilePostDetails"
        component={DetailPostScreen}
      />
      <InnerProfile.Screen
        name="ProfileDetailPostProfile"
        component={ProfileScreen}
      />
    </InnerProfile.Navigator>
  );
};

export {
  InnerFeedNavigator,
  InnerChatSearchNavigator,
  InnerFriendsSearchNavigator,
  InnerDiscoverNavigator,
  InnerProfileNavigator,
};
