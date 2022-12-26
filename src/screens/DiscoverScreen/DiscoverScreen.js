import React, {
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { Platform, Share } from 'react-native';
import { useSelector, ReactReduxContext } from 'react-redux';
import { Feed } from '../../components';
import TNTouchableIcon from '../../Core/truly-native/TNTouchableIcon/TNTouchableIcon';
import {
  postAPIManager,
  commentAPIManager,
  FeedManager,
} from '../../Core/socialgraph/feed/api';
import AppStyles from '../../AppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { Appearance } from 'react-native-appearance';
import { reportingManager } from '../../Core/user-reporting';

const DiscoverScreen = (props) => {
  const { store } = useContext(ReactReduxContext);
  let colorScheme = Appearance.getColorScheme();
  let currentTheme = AppStyles.navThemeConstants[colorScheme];

  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false);
  const [selectedFeedItems, setSelectedFeedItems] = useState([]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [fetchCallCount, setFetchCallCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [flatlistReady, setFlatlistReady] = useState(false);

  const feedManager = useRef(null);

  const discoverFeedPosts = useSelector(
    (state) => state.feed.discoverFeedPosts,
  );
  const currentUser = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.friends.friends);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: IMLocalized('Discover'),
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
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: currentTheme.fontColor,
    });
  }, []);

  useEffect(() => {
    feedManager.current = new FeedManager(store, currentUser.id);
    feedManager.current.subscribeIfNeeded();
    return () => {
      feedManager.current.unsubscribe();
    };
  }, [feedManager]);

  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  const onCommentPress = (item) => {
    let copyItem = { ...item };
    props.navigation.navigate('DiscoverDetailPost', {
      item: { ...copyItem },
      lastScreenTitle: 'Discover',
    });
  };

  const onFeedUserItemPress = async (author) => {
    if (author.id === currentUser.id) {
      props.navigation.navigate('DiscoverProfile', {
        stackKeyTitle: 'DiscoverProfile',
        lastScreenTitle: 'Discover',
      });
    } else {
      props.navigation.navigate('DiscoverProfile', {
        user: author,
        stackKeyTitle: 'DiscoverProfile',
        lastScreenTitle: 'Discover',
      });
    }
  };

  const onMediaClose = () => {
    setIsMediaViewerOpen(false);
  };

  const onMediaPress = (media, mediaIndex) => {
    setSelectedFeedItems(media);
    setSelectedMediaIndex(mediaIndex);
    setIsMediaViewerOpen(true);
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

  const onUserReport = async (item, type) => {
    reportingManager.markAbuse(currentUser.id, item.authorID, type);
  };

  const handleOnEndReached = (distanceFromEnd) => {
    if (!flatlistReady) {
      return;
    }

    if (isFetching) {
      return;
    }
    if (fetchCallCount > 1) {
      return;
    }
  };

  const onFeedScroll = () => {
    setFlatlistReady(true);
  };

  const filterOutRelatedPosts = (posts) => {
    // we filter out posts with no media from self & friends
    if (!posts) {
      return posts;
    }
    const defaultAvatar =
      'https://www.wpg.one/wp-content/uploads/2019/06/empty-avatar.jpg';
    return posts.filter((post) => {
      return (
        post &&
        post.authorID != currentUser.id &&
        post.author &&
        post.author.profilePictureURL &&
        post.author.profilePictureURL != defaultAvatar &&
        post.postMedia &&
        post.postMedia.length > 0 &&
        (!friends || !friends.find((friend) => friend.id == post.authorID))
      );
    });
  };

  const emptyStateConfig = {
    title: IMLocalized('No Discover Posts'),
    description: IMLocalized(
      'There are currently no posts from people who are not your friends. Posts from non-friends will show up here.',
    ),
  };

  return (
    <Feed
      loading={discoverFeedPosts == null}
      feed={filterOutRelatedPosts(discoverFeedPosts)}
      onFeedUserItemPress={onFeedUserItemPress}
      onCommentPress={onCommentPress}
      isMediaViewerOpen={isMediaViewerOpen}
      feedItems={selectedFeedItems}
      onMediaClose={onMediaClose}
      onMediaPress={onMediaPress}
      selectedMediaIndex={selectedMediaIndex}
      handleOnEndReached={handleOnEndReached}
      isFetching={isFetching}
      onReaction={onReaction}
      onSharePost={onSharePost}
      onDeletePost={onDeletePost}
      onUserReport={onUserReport}
      user={currentUser}
      onFeedScroll={onFeedScroll}
      emptyStateConfig={emptyStateConfig}
      isCameraOpen={false}
    />
  );
};

export default DiscoverScreen;
