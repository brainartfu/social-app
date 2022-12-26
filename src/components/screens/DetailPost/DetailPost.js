import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, ActivityIndicator } from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useColorScheme } from 'react-native-appearance';
import FeedItem from '../../FeedItem/FeedItem';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import TNMediaViewerModal from '../../../Core/truly-native/TNMediaViewerModal';
import dynamicStyles from './styles';

function DetailPost(props) {
  const {
    feedItem,
    feedItems,
    commentItems,
    onCommentSend,
    scrollViewRef,
    onMediaPress,
    onReaction,
    onOtherReaction,
    onMediaClose,
    isMediaViewerOpen,
    selectedMediaIndex,
    onFeedUserItemPress,
    onSharePost,
    onDeletePost,
    onUserReport,
    user,
    commentsLoading,
    navigation,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  const onCommentPress = () => {
    console.log('comment');
  };

  const onTextFieldUserPress = (userInfo) => {
    navigation.navigate('MainProfile', {
      user: userInfo,
      stackKeyTitle: 'MainProfile',
      lastScreenTitle: 'MainProfile',
    });
  };

  const onTextFieldHashTagPress = (hashtag) => {
    navigation.push('FeedSearch', { hashtag });
  };

  return (
    <KeyboardAwareView style={styles.detailPostContainer}>
      <ScrollView ref={scrollViewRef}>
        <FeedItem
          item={feedItem}
          isLastItem={true}
          onUserItemPress={onFeedUserItemPress}
          onCommentPress={onCommentPress}
          onMediaPress={onMediaPress}
          onReaction={onReaction}
          onSharePost={onSharePost}
          onDeletePost={onDeletePost}
          onUserReport={onUserReport}
          user={user}
          onTextFieldHashTagPress={onTextFieldHashTagPress}
          onTextFieldUserPress={onTextFieldUserPress}
        />
        {commentsLoading ? (
          <ActivityIndicator style={{ marginVertical: 7 }} size="small" />
        ) : (
          commentItems &&
          commentItems.map((comment) => (
            <CommentItem item={comment} key={comment.id} />
          ))
        )}
      </ScrollView>
      <CommentInput onCommentSend={onCommentSend} />
      <TNMediaViewerModal
        mediaItems={feedItems}
        isModalOpen={isMediaViewerOpen}
        onClosed={onMediaClose}
        selectedMediaIndex={selectedMediaIndex}
      />
    </KeyboardAwareView>
  );
}

DetailPost.propTypes = {
  item: PropTypes.object,
  scrollViewRef: PropTypes.any,
  onMediaPress: PropTypes.func,
  onOtherReaction: PropTypes.func,
  onReaction: PropTypes.func,
  onFeedUserItemPress: PropTypes.func,
  onMediaClose: PropTypes.func,
  feedItems: PropTypes.array,
  isMediaViewerOpen: PropTypes.bool,
  selectedMediaIndex: PropTypes.number,
};

export default DetailPost;
