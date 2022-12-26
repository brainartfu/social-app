import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { useSelector, ReactReduxContext } from 'react-redux';
import { Appearance } from 'react-native-appearance';
import { IMChatHomeComponent } from '../../Core/chat';
import { TNTouchableIcon } from '../../Core/truly-native';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { FriendshipAPITracker } from '../../Core/socialgraph/friendships/api';
import AppStyles from '../../AppStyles';

const ChatScreen = (props) => {
  const { store } = useContext(ReactReduxContext);

  const colorScheme = Appearance.getColorScheme();
  let currentTheme = AppStyles.navThemeConstants[colorScheme];

  const [loading, setLoading] = useState(false);
  const [willBlur, setWillBlur] = useState(false);

  const searchBarRef = useRef();
  const friendshipTracker = useRef(null);
  const willBlurSubscription = useRef(null);
  const didFocusSubscription = useRef(
    props.navigation.addListener('focus', (payload) => {
      setWillBlur(false);
    }),
  );

  const currentUser = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.friends.friends);
  const friendships = useSelector((state) => state.friends.friendships);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: IMLocalized('Conversations'),
      headerRight: () => (
        <TNTouchableIcon
          imageStyle={{ tintColor: currentTheme.fontColor }}
          iconSource={AppStyles.iconSet.inscription}
          onPress={() =>
            props.navigation.navigate('CreateGroup', { appStyles: AppStyles })
          }
          appStyles={AppStyles}
        />
      ),
      headerLeft: () =>
        Platform.OS === 'android' && (
          <TNTouchableIcon
            imageStyle={{ tintColor: currentTheme.fontColor }}
            iconSource={AppStyles.iconSet.menuHamburger}
            onPress={openDrawer}
            appStyles={AppStyles}
          />
        ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTintColor: currentTheme.fontColor,
    });
  }, []);

  useEffect(() => {
    friendshipTracker.current = new FriendshipAPITracker(
      store,
      currentUser.id || currentUser.userID,
      true,
      false,
      true,
    );

    friendshipTracker.current.subscribeIfNeeded();
  }, [currentUser]);

  useEffect(() => {
    willBlurSubscription.current = props.navigation.addListener(
      'blur',
      (payload) => {
        setWillBlur(true);
      },
    );
    return () => {
      willBlurSubscription.current && willBlurSubscription.current();
      didFocusSubscription.current && didFocusSubscription.current();
    };
  }, []);

  useEffect(() => {
    if (willBlur) {
      friendshipTracker.current.unsubscribe();
    }
  }, [willBlur]);

  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  const onFriendItemPress = (friend) => {
    const id1 = currentUser.id || currentUser.userID;
    const id2 = friend.id || friend.userID;
    if (id1 == id2) {
      return;
    }
    const channel = {
      id: id1 < id2 ? id1 + id2 : id2 + id1,
      participants: [friend],
    };
    props.navigation.navigate('PersonalChat', {
      channel,
      appStyles: AppStyles,
    });
  };

  const onSearchButtonPress = async () => {
    props.navigation.navigate('UserSearchScreen', {
      appStyles: AppStyles,
      followEnabled: false,
    });
  };

  const onEmptyStatePress = () => {
    onSearchButtonPress();
  };
  const onSenderProfilePicturePress = (item) => {
    console.log(item);
  };

  return (
    <IMChatHomeComponent
      loading={loading}
      searchBarRef={searchBarRef}
      friends={friends}
      onFriendItemPress={onFriendItemPress}
      onSearchBarPress={onSearchButtonPress}
      onFriendAction={props.onFriendAction}
      appStyles={AppStyles}
      navigation={props.navigation}
      onEmptyStatePress={onEmptyStatePress}
      onSenderProfilePicturePress={onSenderProfilePicturePress}
    />
  );
};

export default ChatScreen;
