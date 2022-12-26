import React, { useState, useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import { useColorScheme } from 'react-native-appearance';
import ActionSheet from 'react-native-actionsheet';
import TruncateText from 'react-native-view-more-text';
import { Viewport } from '@skele/components';
import FeedMedia from './FeedMedia';
import { TNTouchableIcon, TNStoryItem } from '../../Core/truly-native';
import IMRichTextView from '../../Core/mentions/IMRichTextView/IMRichTextView';
import dynamicStyles from './styles';
import AppStyles from '../../AppStyles';
import { timeFormat } from '../../Core';
import { IMLocalized } from '../../Core/localization/IMLocalization';

const ViewportAwareSwiper = Viewport.Aware(Swiper);

const reactionIcons = ['like', 'love', 'laugh', 'surprised', 'cry', 'angry'];

const FeedItem = memo((props) => {
  const {
    item,
    isLastItem,
    onCommentPress,
    containerStyle,
    onUserItemPress,
    onMediaPress,
    onReaction,
    onSharePost,
    onDeletePost,
    onUserReport,
    user,
    willBlur,
    onTextFieldUserPress,
    onTextFieldHashTagPress,
  } = props;

  if (!item) {
    alert('There is no feed item to display. You must fix this error.');
    return null;
  }

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);

  let defaultReaction = 'thumbsupUnfilled';
  const [postMediaIndex, setPostMediaIndex] = useState(0);
  const [inViewPort, setInViewPort] = useState(false);
  const [otherReactionsVisible, setOtherReactionsVisible] = useState(false);
  const [selectedIconName, setSelectedIconName] = useState(
    item.myReaction ? item.myReaction : defaultReaction,
  );

  const [reactionCount, setReactionCount] = useState(item.reactionsCount);

  const moreRef = useRef();

  const moreArray = useRef([IMLocalized('Share Post')]);

  useEffect(() => {
    if (item.authorID === user.id) {
      moreArray.current.push(IMLocalized('Delete Post'));
    } else {
      moreArray.current.push(IMLocalized('Block User'));
      moreArray.current.push(IMLocalized('Report Post'));
    }

    moreArray.current.push(IMLocalized('Cancel'));
  }, []);

  useEffect(() => {
    if (!item) {
      return;
    }
    setReactionCount(item.reactionsCount);
  }, [item?.reactionsCount]);

  useEffect(() => {
    if (!item) {
      return;
    }
    setSelectedIconName(item.myReaction ? item.myReaction : defaultReaction);
  }, [item?.myReaction]);

  const onReactionPress = async (reaction) => {
    if (reaction == null) {
      // this was a single tap on the inline icon, therefore a like or unlike
      if (item.myReaction) {
        if (otherReactionsVisible) {
          // Reactions tray is visible, so we only hide it
          setOtherReactionsVisible(false);
          return;
        }
        setSelectedIconName(defaultReaction);
        if (reactionCount > 0) {
          setReactionCount(reactionCount - 1);
        }
        onReaction(null, item); // sending a null reaction will undo the previous action
      } else {
        // If we didn't have a reaction before, we increment the UI optimistically
        setReactionCount(reactionCount + 1);
        setSelectedIconName('like');
        onReaction('like', item); // there were no reaction before, and there was a single tap on the inline action button
      }
      setOtherReactionsVisible(false);
      return;
    }
    // this was a reaction on the reactions tray, coming after a long press + one tap
    if (item.myReaction && item.myReaction == reaction) {
      // Nothing changes, since this is the same reaction as before
      setOtherReactionsVisible(false);
      return;
    }
    if (!item.myReaction) {
      // If we didn't have a reaction before, we increment the UI optimistically
      setReactionCount(reactionCount + 1);
    }
    setSelectedIconName(reaction ? reaction : defaultReaction);
    setOtherReactionsVisible(false);
    onReaction(reaction, item);
  };

  const onReactionLongPress = () => {
    setOtherReactionsVisible(!otherReactionsVisible);
  };

  const onMorePress = () => {
    if (otherReactionsVisible) {
      setOtherReactionsVisible(false);
      return;
    }
    moreRef.current.show();
  };

  const didPressComment = () => {
    if (otherReactionsVisible) {
      setOtherReactionsVisible(false);
      return;
    }
    onCommentPress(item);
  };

  const onMoreDialogDone = (index) => {
    if (index === moreArray.current.indexOf(IMLocalized('Share Post'))) {
      onSharePost(item);
    }

    if (
      index === moreArray.current.indexOf(IMLocalized('Report Post')) ||
      index === moreArray.current.indexOf(IMLocalized('Block User'))
    ) {
      onUserReport(item, moreArray.current[index]);
    }

    if (index === moreArray.current.indexOf(IMLocalized('Delete Post'))) {
      onDeletePost(item);
    }
  };

  const inactiveDot = () => <View style={styles.inactiveDot} />;

  const activeDot = () => <View style={styles.activeDot} />;

  const renderTouchableIconIcon = (src, tappedIcon, index) => {
    return (
      <TNTouchableIcon
        key={index + 'icon'}
        containerStyle={styles.reactionIconContainer}
        iconSource={src}
        imageStyle={styles.reactionIcon}
        onPress={() => onReactionPress(tappedIcon)}
        appStyles={AppStyles}
      />
    );
  };

  const renderViewMore = (onPress) => {
    return (
      <Text onPress={onPress} style={styles.moreText}>
        {IMLocalized('more')}
      </Text>
    );
  };

  const renderViewLess = (onPress) => {
    return (
      <Text onPress={onPress} style={styles.moreText}>
        {IMLocalized('less')}
      </Text>
    );
  };

  const renderPostText = (item) => {
    if (item.postText) {
      return (
        <TruncateText
          numberOfLines={2}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={styles.body}>
          <IMRichTextView
            defaultTextStyle={styles.body}
            onUserPress={onTextFieldUserPress}
            onHashTagPress={onTextFieldHashTagPress}>
            {item.postText || ' '}
          </IMRichTextView>
        </TruncateText>
      );
    }
    return null;
  };

  const renderMedia = (item) => {
    if (
      item &&
      item.postMedia &&
      item.postMedia.length &&
      item.postMedia.length > 0
    ) {
      return (
        <View style={styles.bodyImageContainer}>
          <ViewportAwareSwiper
            removeClippedSubviews={false}
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            dot={inactiveDot()}
            activeDot={activeDot()}
            paginationStyle={{
              bottom: 20,
            }}
            onIndexChanged={(swiperIndex) => setPostMediaIndex(swiperIndex)}
            loop={false}
            onViewportEnter={() => setInViewPort(true)}
            onViewportLeave={() => setInViewPort(false)}
            preTriggerRatio={1}
            preTriggerRatio={-0.4}>
            {item.postMedia.map((media, index) => (
              <FeedMedia
                key={index + 'feedMedia'}
                inViewPort={inViewPort}
                index={index}
                postMediaIndex={postMediaIndex}
                media={media}
                item={item}
                isLastItem={isLastItem}
                onImagePress={onMediaPress}
                dynamicStyles={styles}
                willBlur={willBlur}
              />
            ))}
          </ViewportAwareSwiper>
        </View>
      );
    }
    return null;
  };

  var inlineActionIconStyle;
  if (Platform.OS === 'ios') {
    inlineActionIconStyle =
      selectedIconName == defaultReaction
        ? [styles.inlineActionIconDefault]
        : [styles.inlineActionIcon];
  } else {
    inlineActionIconStyle = [styles.inlineActionIcon];
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={didPressComment}
      style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        {item.author && (
          <TNStoryItem
            imageContainerStyle={styles.userImageContainer}
            item={item.author}
            onPress={onUserItemPress}
            appStyles={AppStyles}
          />
        )}
        <View style={styles.titleContainer}>
          {item.author && (
            <Text style={styles.title}>
              {item.author.firstName +
                (item.author.lastName ? ' ' + item.author.lastName : '')}
            </Text>
          )}
          <View style={styles.mainSubtitleContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>{timeFormat(item.createdAt)}</Text>
            </View>
            <View style={[styles.subtitleContainer, { flex: 2 }]}>
              <Text style={styles.subtitle}>{item.location}</Text>
            </View>
          </View>
        </View>
        <TNTouchableIcon
          onPress={onMorePress}
          imageStyle={styles.moreIcon}
          containerStyle={styles.moreIconContainer}
          iconSource={AppStyles.iconSet.more}
          appStyles={AppStyles}
        />
      </View>
      {renderPostText(item)}
      {renderMedia(item)}
      {otherReactionsVisible && (
        <View style={styles.reactionContainer}>
          {reactionIcons.map((icon, index) =>
            renderTouchableIconIcon(AppStyles.iconSet[icon], icon, index),
          )}
        </View>
      )}
      <View style={styles.footerContainer}>
        <TNTouchableIcon
          containerStyle={styles.footerIconContainer}
          iconSource={AppStyles.iconSet[selectedIconName]}
          imageStyle={inlineActionIconStyle}
          renderTitle={true}
          title={reactionCount < 1 ? ' ' : reactionCount}
          onLongPress={() => onReactionLongPress()}
          onPress={() => onReactionPress(null)}
          appStyles={AppStyles}
        />
        <TNTouchableIcon
          containerStyle={styles.footerIconContainer}
          iconSource={AppStyles.iconSet.commentUnfilled}
          imageStyle={[styles.inlineActionIconDefault]}
          renderTitle={true}
          title={item.commentCount < 1 ? ' ' : item.commentCount}
          onPress={didPressComment}
          appStyles={AppStyles}
        />
      </View>
      <ActionSheet
        ref={moreRef}
        title={IMLocalized('More')}
        options={moreArray.current}
        destructiveButtonIndex={moreArray.current.indexOf('Delete Post')}
        cancelButtonIndex={moreArray.current.length - 1}
        onPress={onMoreDialogDone}
      />
    </TouchableOpacity>
  );
});

FeedItem.propTypes = {
  onPress: PropTypes.func,
  onOtherReaction: PropTypes.func,
  onLikeReaction: PropTypes.func,
  onUserItemPress: PropTypes.func,
  onCommentPress: PropTypes.func,
  onMediaPress: PropTypes.func,
  item: PropTypes.object,
  iReact: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FeedItem;
