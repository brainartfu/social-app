import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from 'react';
import { Platform, BackHandler } from 'react-native';
import { useSelector, ReactReduxContext, useDispatch } from 'react-redux';
import { Profile } from '../../components';
import { userAPIManager, storageAPI } from '../../Core/api';
import { friendship } from '../../Core/socialgraph/friendships/api';
import AppStyles from '../../AppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { setUserData } from '../../Core/onboarding/redux/auth';
import { TNTouchableIcon } from '../../Core/truly-native';
import SocialNetworkConfig from '../../SocialNetworkConfig';
import { FriendshipConstants } from '../../Core/socialgraph/friendships';
import {
  postAPIManager,
  commentAPIManager,
  FeedManager,
} from '../../Core/socialgraph/feed/api';
import { FriendshipManager } from '../../Core/socialgraph/friendships/api';
import { Appearance } from 'react-native-appearance';

const defaultAvatar =
  'https://www.wpg.one/wp-content/uploads/2019/06/empty-avatar.jpg';
const initialCountDisplay = 6;

const ProfileScreen = (props) => {
  const { store } = useContext(ReactReduxContext);

  let colorScheme = Appearance.getColorScheme();
  let currentTheme = AppStyles.navThemeConstants[colorScheme];

  const friends = useSelector((state) => state.friends.friends);
  const currentUser = useSelector((state) => state.auth.user);
  const friendships = useSelector((state) => state.friends.friendships);
  const currentUserFeedPosts = useSelector(
    (state) => state.feed.currentUserFeedPosts,
  );

  const otherUser = props.route?.params?.user;
  const [shouldAddFriend, setShouldAddFriend] = useState(null);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [profilePosts, setProfilePosts] = useState(null);
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false);
  const [selectedFeedItems, setSelectedFeedItems] = useState([]);
  const [friendsUi, setFriendsUi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [feedBatchLimit, setFeedBatchLimit] = useState(15);
  const [fetchCallCount, setFetchCallCount] = useState(0);
  const [stackKeyTitle, setStackKeyTitle] = useState('Profile');
  const [displaySubButton, setDisplaySubButton] = useState(null);
  const [ProfileSettingsTitle, setProfileSettingsTitle] = useState(
    'ProfileProfileSettings',
  );

  const [lastScreenTitle, setLastScreenTitle] = useState(
    props.route?.params?.lastScreenTitle,
  );
  const [mainButtonTitle, setMainButtonTitle] = useState('');

  const feedManager = useRef(null);
  const friendshipManager = useRef(null);
  const currentProfileFeedUnsubscribe = useRef(null);
  const currentUserUnsubscribe = useRef(null);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: IMLocalized('Profile'),
      headerRight: () =>
        !otherUser && (
          <TNTouchableIcon
            imageStyle={{ tintColor: currentTheme.activeTintColor }}
            iconSource={AppStyles.iconSet.bell}
            onPress={navigateNotifi}
            appStyles={AppStyles}
          />
        ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: currentTheme.fontColor,
    });

    if (!otherUser && Platform.OS === 'android') {
      props.navigation.setOptions({
        headerLeft: () => (
          <TNTouchableIcon
            imageStyle={{ tintColor: currentTheme.fontColor }}
            iconSource={AppStyles.iconSet.menuHamburger}
            onPress={openDrawer}
            appStyles={AppStyles}
          />
        ),
      });
    }
  }, [lastScreenTitle]);

  useEffect(() => {
    const keyTitle = props.route?.params?.stackKeyTitle;

    if (keyTitle) {
      setStackKeyTitle(keyTitle);
    }

    if (lastScreenTitle) {
      setProfileSettingsTitle(lastScreenTitle + 'ProfileSettings');
    } else {
      setLastScreenTitle('Profile');
    }

    feedManager.current = new FeedManager(store, currentUser.id);
    feedManager.current.subscribeIfNeeded();

    friendshipManager.current = new FriendshipManager(
      false,
      onFriendshipsRetrieved,
    );
    if (otherUser && otherUser.id != currentUser.id) {
      let profileUserID = otherUser.id;
      currentProfileFeedUnsubscribe.current = postAPIManager.subscribeToProfileFeedPosts(
        profileUserID,
        onProfileFeedUpdate,
      );
      currentUserUnsubscribe.current = userAPIManager.subscribeCurrentUser(
        profileUserID,
        onCurrentUserUpdate,
      );
      setIsLoading(true);
      friendshipManager.current.fetchFriendships(otherUser.id);
    } else {
      currentProfileFeedUnsubscribe.current = postAPIManager.subscribeToProfileFeedPosts(
        currentUser.id,
        onProfileFeedUpdate,
      );
      currentUserUnsubscribe.current = userAPIManager.subscribeCurrentUser(
        currentUser.id,
        onCurrentUserUpdate,
      );
      friendshipManager.current.fetchFriendships(currentUser.id);

      setProfilePosts(
        feedManager.current.hydratePostsWithReduxReactions(
          currentUserFeedPosts,
        ),
      );
      setIsLoading(true);
    }
    return () => {
      currentProfileFeedUnsubscribe.current &&
        currentProfileFeedUnsubscribe.current();
      currentUserUnsubscribe.current && currentUserUnsubscribe.current();
      friendshipManager.current && friendshipManager.current.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!friendships) {
      return;
    }
    if (shouldAddFriend === null) {
      setShouldAddFriend(
        otherUser
          ? !friendships.find((friend) => friend?.user?.id === otherUser?.id)
          : false,
      );
    }
  }, [friendships]);

  const onCurrentUserUpdate = (currentUser) => {};

  const onFriendshipsRetrieved = (
    mutualFriendships,
    inboundFriendships,
    outboundFriendships,
  ) => {
    setLoading(false);
    const friends = mutualFriendships.map((friendship) => friendship.user);
    setFriendsUi(friends.slice(0, initialCountDisplay));
    setDisplaySubButton(friends && friends.length > initialCountDisplay);
  };

  const onProfileFeedUpdate = (profilePosts) => {
    setProfilePosts(
      feedManager.current.hydratePostsWithReduxReactions(profilePosts),
    );
    setLoading(false);
  };

  const navigateNotifi = () => {
    props.navigation.navigate(lastScreenTitle + 'Notification', {
      lastScreenTitle: lastScreenTitle,
      appStyles: AppStyles,
    });
  };

  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  const onMainButtonPress = () => {
    if (shouldAddFriend) {
      onAddFriend();
      return;
    }
    if (otherUser) {
      onMessage();
      return;
    }
    props.navigation.navigate(ProfileSettingsTitle, {
      lastScreenTitle: lastScreenTitle,
      appStyles: AppStyles,
      appConfig: SocialNetworkConfig,
    });
  };

  const onMessage = () => {
    const viewer = currentUser;
    const viewerID = viewer.id || viewer.userID;
    const friendID = otherUser.id || otherUser.userID;
    let channel = {
      id: viewerID < friendID ? viewerID + friendID : friendID + viewerID,
      participants: [otherUser],
    };
    props.navigation.navigate('PersonalChat', {
      channel,
      appStyles: AppStyles,
    });
  };

  const onMediaClose = () => {
    setIsMediaViewerOpen(false);
  };

  const startUpload = async (source) => {
    dispatch(
      setUserData({
        user: { ...currentUser, profilePictureURL: source?.path || source.uri },
        profilePictureURL: source?.path || source.uri,
      }),
    );

    storageAPI.processAndUploadMediaFileWithProgressTracking(
      source,
      async (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(uploadProgress);
      },
      async (url) => {
        const data = {
          profilePictureURL: url,
        };
        dispatch(
          setUserData({
            user: { ...currentUser, profilePictureURL: url },
          }),
        );

        userAPIManager.updateUserData(currentUser.id, data);
        setUploadProgress(0);
      },
      (error) => {
        setUploadProgress(0);
        console.log(error);
        alert(
          IMLocalized(
            'Oops! An error occured while trying to update your profile picture. Please try again.',
          ),
        );
        console.log(error);
      },
    );
  };

  const removePhoto = async () => {
    const res = await userAPIManager.updateUserData(currentUser.id, {
      profilePictureURL: defaultAvatar,
    });
    if (res.success) {
      dispatch(
        setUserData({
          user: { ...currentUser, profilePictureURL: defaultAvatar },
        }),
      );
    } else {
      alert(
        IMLocalized(
          'Oops! An error occured while trying to remove your profile picture. Please try again.',
        ),
      );
    }
  };

  const onAddFriend = () => {
    const newFriendId = otherUser.id || otherUser.userID;
    setShouldAddFriend(false);

    friendship.addFriendRequest(
      currentUser,
      otherUser,
      true,
      false,
      true,
      ({ success, error }) => {
        if (error) {
          alert(error);
          setShouldAddFriend(true);
        } else {
          const newFriendId = otherUser.id || otherUser.userID;
          const detectedFriendship = friendships.find(
            (friendship) =>
              friendship.user.id == newFriendId &&
              friendship.type == FriendshipConstants.FriendshipType.reciprocal,
          );
          if (detectedFriendship) {
            friendship.updateFeedsForNewFriends(currentUser.id, newFriendId);
          }
        }
      },
    );
  };

  const onEmptyStatePress = () => {
    props.navigation.navigate('CreatePost');
  };

  const handleOnEndReached = (distanceFromEnd) => {
    if (isFetching) {
      return;
    }
    if (fetchCallCount > 1) {
      return;
    }
  };

  const onReaction = async (reaction, item) => {
    feedManager.current.applyReaction(reaction, item, false);
    commentAPIManager.handleReaction(reaction, currentUser, item, false);
  };

  const onSharePost = async (item) => {
    let url = '';
    if (item.postMedia?.length > 0) {
      url = item.postMedia[0]?.url || item.postMedia[0];
    }
    try {
      const result = await Share.share(
        {
          title: 'Share SocialNetwork post.',
          message: item.postText,
          url,
        },
        {
          dialogTitle: 'Share SocialNetwork post.',
        },
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const onDeletePost = async (item) => {
    const res = await postAPIManager.deletePost(item, true);
    if (res.error) {
      alert(res.error);
    }
  };

  const onFriendItemPress = (item) => {
    if (item.id === currentUser.id || item.userID === currentUser.id) {
      props.navigation.push(stackKeyTitle, {
        stackKeyTitle: stackKeyTitle,
      });
    } else {
      props.navigation.push(stackKeyTitle, {
        user: item,
        stackKeyTitle: stackKeyTitle,
      });
    }
  };

  const onSubButtonTitlePress = () => {
    props.navigation.push(lastScreenTitle + 'AllFriends', {
      lastScreenTitle: lastScreenTitle,
      title: IMLocalized('Friends'),
      stackKeyTitle: stackKeyTitle,
      otherUser: otherUser,
      includeReciprocal: true,
      appStyles: AppStyles,
      followEnabled: false,
    });
  };

  const onFeedUserItemPress = async (author) => {
    if (other && other.id == author.id) {
      return;
    }
    if (!other) {
      return;
    }
    if (author.id === currentUser.id) {
      props.navigation.navigate('DiscoverProfile', {
        stackKeyTitle: stackKeyTitle,
        lastScreenTitle: lastScreenTitle,
      });
    } else {
      props.navigation.navigate('DiscoverProfile', {
        user: author,
        stackKeyTitle: stackKeyTitle,
        lastScreenTitle: lastScreenTitle,
      });
    }
  };

  const onMediaPress = (media, mediaIndex) => {
    setSelectedMediaIndex(mediaIndex);
    setSelectedFeedItems(media);
    setIsMediaViewerOpen(true);
  };

  const onCommentPress = (item) => {
    props.navigation.navigate(`${stackKeyTitle}PostDetails`, {
      item: item,
      lastScreenTitle: 'Profile',
    });
  };

  useEffect(() => {
    setDisplaySubButton(friends && friends.length > initialCountDisplay);
    setFriendsUi(friends ? friends.slice(0, initialCountDisplay) : null);
  }, []);

  useEffect(() => {
    if (!otherUser) {
      setMainButtonTitle(IMLocalized('Profile Settings'));
      return;
    }
    if (otherUser && shouldAddFriend !== null) {
      if (shouldAddFriend) {
        setMainButtonTitle(IMLocalized('Add Friend'));
        return;
      }
      setMainButtonTitle(IMLocalized('Send Message'));
    }
  }, [shouldAddFriend]);

  return (
    <Profile
      loading={loading}
      uploadProgress={uploadProgress}
      user={otherUser ? otherUser : currentUser}
      loggedInUser={currentUser}
      mainButtonTitle={mainButtonTitle}
      subButtonTitle={IMLocalized('See All Friends')}
      displaySubButton={displaySubButton}
      friends={friendsUi}
      recentUserFeeds={profilePosts}
      onFriendItemPress={onFriendItemPress}
      onMainButtonPress={onMainButtonPress}
      selectedMediaIndex={selectedMediaIndex}
      onSubButtonTitlePress={onSubButtonTitlePress}
      onCommentPress={onCommentPress}
      onFeedUserItemPress={onFeedUserItemPress}
      isMediaViewerOpen={isMediaViewerOpen}
      feedItems={selectedFeedItems}
      onMediaClose={onMediaClose}
      onReaction={onReaction}
      onMediaPress={onMediaPress}
      removePhoto={removePhoto}
      startUpload={startUpload}
      handleOnEndReached={handleOnEndReached}
      isFetching={isFetching}
      isOtherUser={otherUser}
      onSharePost={onSharePost}
      onDeletePost={onDeletePost}
      onEmptyStatePress={onEmptyStatePress}
      navigation={props.navigation}
    />
  );
};

export default ProfileScreen;
