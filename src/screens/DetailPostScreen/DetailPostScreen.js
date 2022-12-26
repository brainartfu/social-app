import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { BackHandler, Share } from 'react-native';
import { DetailPost } from '../../components';
import {
  commentAPIManager,
  postAPIManager,
} from '../../Core/socialgraph/feed/api';
import AppStyles from '../../AppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { reportingManager } from '../../Core/user-reporting';
import { Appearance } from 'react-native-appearance';

const DetailScreen = (props) => {
  const colorScheme = Appearance.getColorScheme();
  let currentTheme = AppStyles.navThemeConstants[colorScheme];

  const lastScreenTitle = props.route.params.lastScreenTitle;
  const profileScreenTitle = lastScreenTitle + 'Profile';
  const item = props.route.params.item;

  const [feedItem, setFeedItem] = useState(item);
  const [comments, setComments] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [selectedFeedItems, setSelectedFeedItems] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false);

  const scrollViewRef = useRef();
  const unsubscribeComments = useRef(null);
  const unsubscribeSinglePost = useRef(null);

  const myReactions = useSelector((state) => state.feed.feedPostReactions);
  const currentUser = useSelector((state) => state.auth.user);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: IMLocalized('Post'),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: currentTheme.fontColor,
    });
  }, []);

  useEffect(() => {
    if (!item?.id) {
      return;
    }
    unsubscribeSinglePost.current = postAPIManager.subscribeToSinglePost(
      item.id,
      onFeedItemUpdate,
    );
    unsubscribeComments.current = commentAPIManager.subscribeComments(
      item.id,
      onCommentsUpdate,
    );
  }, [item?.id]);

  useEffect(() => {
    return () => {
      unsubscribeComments.current && unsubscribeComments.current();
      unsubscribeSinglePost.current && unsubscribeSinglePost.current();
    };
  }, []);

  const onFeedItemUpdate = (feedItem) => {
    const myReaction = myReactions?.find(
      (reaction) => reaction.postID == feedItem.id,
    );
    if (myReaction) {
      setFeedItem({ ...feedItem, myReaction: myReaction.reaction });
    } else {
      setFeedItem({ ...feedItem, myReaction: null });
    }
  };

  const onCommentsUpdate = (comments) => {
    setComments(comments);
    setCommentsLoading(false);
  };

  const onCommentSend = async (value) => {
    const commentObject = {
      postID: feedItem.id,
      commentText: value,
      authorID: currentUser.id,
    };
    commentAPIManager.addComment(commentObject, currentUser, feedItem, false);
  };

  const onReaction = async (reaction, item) => {
    await commentAPIManager.handleReaction(reaction, currentUser, item, false);
  };

  const onMediaPress = (media, mediaIndex) => {
    setSelectedMediaIndex(mediaIndex);
    setSelectedFeedItems(media);
    setIsMediaViewerOpen(true);
  };

  const onMediaClose = () => {
    setIsMediaViewerOpen(false);
  };

  const onFeedUserItemPress = async (item) => {
    if (item.id === currentUser.id) {
      props.navigation.navigate(profileScreenTitle, {
        stackKeyTitle: profileScreenTitle,
        lastScreenTitle: lastScreenTitle,
      });
    } else {
      props.navigation.navigate(profileScreenTitle, {
        user: item,
        stackKeyTitle: profileScreenTitle,
        lastScreenTitle: lastScreenTitle,
      });
    }
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
    } else {
      props.navigation.goBack();
    }
  };

  const onUserReport = async (item, type) => {
    await reportingManager.markAbuse(currentUser.id, item.authorID, type);
    props.navigation.goBack();
  };

  return (
    <DetailPost
      scrollViewRef={scrollViewRef}
      feedItem={feedItem}
      commentItems={comments}
      commentsLoading={commentsLoading}
      onCommentSend={onCommentSend}
      onFeedUserItemPress={onFeedUserItemPress}
      onMediaPress={onMediaPress}
      feedItems={selectedFeedItems}
      onMediaClose={onMediaClose}
      isMediaViewerOpen={isMediaViewerOpen}
      selectedMediaIndex={selectedMediaIndex}
      onReaction={onReaction}
      onSharePost={onSharePost}
      onDeletePost={onDeletePost}
      onUserReport={onUserReport}
      user={currentUser}
      navigation={props.navigation}
    />
  );
};

export default DetailScreen;
