import PropTypes from 'prop-types';
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { BackHandler, ActivityIndicator, Alert, Platform } from 'react-native';
import TextButton from 'react-native-button';
import { useSelector } from 'react-redux';
import { CreatePost } from '../../components';
import { postAPIManager } from '../../Core/socialgraph/feed/api';
import { storageAPI } from '../../Core/api';
import AppStyles from '../../AppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { friendshipUtils } from '../../Core/socialgraph/friendships';
import { Appearance } from 'react-native-appearance';

const defaultPost = {
  postText: '',
  commentCount: 0,
  reactionsCount: 0,
  reactions: {
    surprised: 0,
    angry: 0,
    sad: 0,
    laugh: 0,
    like: 0,
    cry: 0,
    love: 0,
  },
};

const CreatePostScreen = (props) => {
  const colorScheme = Appearance.getColorScheme();
  let currentTheme = AppStyles.navThemeConstants[colorScheme];
  const [post, setPost] = useState(defaultPost);
  const [postMedia, setPostMedia] = useState([]); // array of local photo URLs
  const [location, setLocation] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const inputRef = useRef(null);
  const willBlurSubscription = useRef(null);
  const didFocusSubscription = useRef(
    props.navigation.addListener('focus', (payload) =>
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackButtonPressAndroid,
      ),
    ),
  );

  const currentUser = useSelector((state) => state.auth.user);
  const friends = useSelector((state) => state.friends.friends);
  const friendships = useSelector((state) => state.friends.friendships);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: IMLocalized('Create Post'),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
        borderBottomColor: currentTheme.hairlineColor,
      },
      headerTintColor: currentTheme.fontColor,
    });
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        isPosting ? (
          Platform.OS === 'ios' ? (
            <ActivityIndicator
              animating={true}
              style={{ margin: 10 }}
              color={AppStyles.colorSet[colorScheme].mainTextColor}
              size="small"
            />
          ) : (
            <ActivityIndicator
              animating={true}
              color={AppStyles.colorSet[colorScheme].mainTextColor}
              style={{ margin: 10 }}
              number={5}
            />
          )
        ) : (
          <TextButton style={{ marginRight: 12 }} onPress={onPost}>
            {IMLocalized('Post')}
          </TextButton>
        ),
    });
  }, [post, isPosting, postMedia]);

  useEffect(() => {
    inputRef.current?.focus();
    willBlurSubscription.current = props.navigation.addListener(
      'blur',
      (payload) =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackButtonPressAndroid,
        ),
    );
    return () => {
      willBlurSubscription.current && willBlurSubscription.current();
      didFocusSubscription.current && didFocusSubscription.current();
    };
  }, []);

  const onBackButtonPressAndroid = () => {
    props.navigation.goBack();
    return true;
  };

  const onPostDidChange = (post) => {
    setPost(post);
  };

  const onSetMedia = (files) => {
    if (files?.length > 0) {
      setPostMedia(files);
    }
  };

  const onLocationDidChange = (location) => {
    setLocation(location);
  };

  const findHashtags = (post) => {
    const regexp = /(\s|^)\#\w\w+\b/gm;
    let result = post?.match(regexp);
    if (result) {
      result = result.map((text) => text.trim());
      return result;
    } else {
      return [];
    }
  };

  const onPost = async () => {
    const hashtags = findHashtags(post.postText);
    const tempPost = {
      ...post,
      authorID: currentUser.id,
      location: location,
      postMedia: postMedia,
      hashtags,
    };
    setPost(tempPost);

    const isEmptyPost = tempPost.postText.trim() === '';
    if (postMedia.length === 0 && isEmptyPost) {
      Alert.alert(
        IMLocalized('Empty Post'),
        IMLocalized(
          'You may not create an empty post. Write a post or select a photo to proceed.',
        ),
        [{ text: IMLocalized('OK') }],
        {
          cancelable: false,
        },
      );
      return;
    }
    setIsPosting(true);
    if (tempPost && tempPost?.postMedia.length === 0) {
      // If we have a post with no media, add it directly into the database
      await postAPIManager.addPost(
        tempPost,
        friendshipUtils.getFollowerIDs(friendships, friends, false),
        currentUser,
      );
      // Once the post was created, we go to the home feed
      props.navigation.goBack();
    } else {
      // If we have a post with media, we first upload the media to the storage server and then add the post into the database
      startPostUpload();
    }
  };

  const startPostUpload = async () => {
    const uploadPromises = [];
    const mediaSources = [];

    postMedia?.forEach((media) => {
      const { mime } = media;
      uploadPromises.push(
        new Promise((resolve, reject) => {
          storageAPI.processAndUploadMediaFile(media).then((response) => {
            if (!response.error) {
              mediaSources.push({
                url: response.downloadURL,
                thumbnailURL: response.thumbnailURL ?? response.downloadURL,
                mime,
              });
            } else {
              alert(
                IMLocalized(
                  'Oops! An error occured while uploading your post. Please try again.',
                ),
              );
            }
            resolve();
          });
        }),
      );
    });
    Promise.all(uploadPromises).then(async () => {
      // Once we've uploaded all the medias (photos, videos) attached to the post, we create the post in the database
      const postToUpload = { ...post, postMedia: [...mediaSources] };
      await postAPIManager.addPost(
        postToUpload,
        friendshipUtils.getFollowerIDs(friendships, friends, false),
        currentUser,
      );
      // Once the post was created, we go to the home feed
      props.navigation.goBack();
    });
  };

  const blurInput = () => {
    inputRef.current?.blur();
  };

  return (
    <CreatePost
      inputRef={inputRef}
      user={currentUser}
      onPostDidChange={onPostDidChange}
      onSetMedia={onSetMedia}
      onLocationDidChange={onLocationDidChange}
      blurInput={blurInput}
      friends={friends}
    />
  );
};

export default CreatePostScreen;
