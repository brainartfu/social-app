import React, { useRef, useState, useEffect, memo } from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  NativeModules,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { createImageProgress } from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import { TNTouchableIcon } from '../../Core/truly-native';
import { loadCachedItem } from '../../Core/helpers/cacheManager';
import AppStyles from '../../AppStyles';
// import CircleSnail from 'react-native-progress/CircleSnail';

const Image = createImageProgress(FastImage);

const { VideoPlayerManager } = NativeModules;
const circleSnailProps = { thickness: 1, color: '#D0D0D0', size: 20 };

const FeedMedia = memo(
  ({
    media,
    index,
    item,
    isLastItem,
    onImagePress,
    dynamicStyles,
    postMediaIndex,
    inViewPort,
    willBlur,
  }) => {
    if (!item.postMedia || !item.postMedia.length) {
      alert('There is no post media to display. You must fix this error.');
      return null;
    }

    const currentUser = useSelector((state) => state.auth.user);

    const isValidUrl = media.url && media.url.startsWith('http');
    const isValidLegacyUrl = !media.url && media.startsWith('http');
    const uri = isValidUrl || isValidLegacyUrl ? media.url || media : '';
    const thumbnailUri = media?.thumbnailURL;

    const [videoLoading, setVideoLoading] = useState(true);
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const [playEnabledFromSettings, setPlayEnabledFromSettings] = useState(
      false,
    );
    const [cachedImage, setCachedImage] = useState(uri);
    const [cachedVideo, setCachedVideo] = useState(null);
    const videoRef = useRef();

    const isImage = media && media.mime && media.mime.startsWith('image');
    const isVideo = media && media.mime && media.mime.startsWith('video');
    const noTypeStated = !media.mime && media;

    // autoplay_video_enabled
    // mute_video_enabled

    const settingsHandler = {
      autoplay_video_enabled: (playValue) =>
        setPlayEnabledFromSettings(playValue),
      mute_video_enabled: (muteValue) => setIsVideoMuted(muteValue),
    };

    useEffect(() => {
      const appSettings = currentUser.settings;
      if (appSettings) {
        const settingsKeys = Object.keys(appSettings);
        if (settingsKeys.length > 0) {
          settingsKeys.forEach(
            (key) =>
              settingsHandler[key] && settingsHandler[key](appSettings[key]),
          );
        }
      }
    }, [currentUser]);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.setIsMutedAsync(isVideoMuted);
      }
    }, [isVideoMuted]);

    useEffect(() => {
      const loadImage = async () => {
        if (noTypeStated && (isValidUrl || isValidLegacyUrl)) {
          const image = await loadCachedItem({ uri });
          setCachedImage(image);
        }

        if (isImage && (isValidUrl || isValidLegacyUrl)) {
          const image = await loadCachedItem({ uri });
          setCachedImage(image);
        }
        if (isVideo && (isValidUrl || isValidLegacyUrl)) {
          const image = await loadCachedItem({ uri: thumbnailUri });
          const video = await loadCachedItem({ uri });
          setCachedImage(image);
          setCachedVideo(video);
        }
      };

      loadImage();
    }, []);

    useEffect(() => {
      const handleIsPostMediaIndex = async () => {
        if (postMediaIndex === index && inViewPort && playEnabledFromSettings) {
          if (videoRef.current) {
            await videoRef.current.setPositionAsync(0);
            await videoRef.current.playAsync(true);
          }
        } else {
          if (videoRef.current) {
            await videoRef.current.pauseAsync(true);
          }
        }
      };

      handleIsPostMediaIndex();
    }, [postMediaIndex]);

    useEffect(() => {
      handleInViewPort();
    }, [inViewPort]);

    useEffect(() => {
      const handleVideoStatus = async () => {
        if (videoRef.current) {
          const videoStatus = await videoRef.current.getStatusAsync();
          if (videoStatus.isPlaying) {
            videoRef.current.pauseAsync(true);
          }
        }
      };

      handleVideoStatus();
    }, [willBlur]);

    const handleInViewPort = async () => {
      const postMedia = item.postMedia;

      if (
        postMediaIndex === index &&
        postMedia[postMediaIndex] &&
        isVideo &&
        playEnabledFromSettings
      ) {
        if (inViewPort) {
          if (videoRef.current) {
            await videoRef.current.setPositionAsync(0);
            await videoRef.current.playAsync(true);
          }
        } else {
          if (videoRef.current) {
            await videoRef.current.pauseAsync(true);
          }
        }
      }
    };

    const onVideoLoadStart = () => {
      setVideoLoading(true);
    };

    const onVideoLoad = () => {
      setVideoLoading(false);
    };

    const onSoundPress = () => {
      setIsVideoMuted((prevIsVideoMuted) => !prevIsVideoMuted);
    };

    const onVideoMediaPress = (url) => {
      if (Platform.OS === 'android') {
        VideoPlayerManager.showVideoPlayer(url);
      } else {
        if (videoRef.current) {
          videoRef.current.presentFullscreenPlayer();
        }
      }
    };

    const onImageMediaPress = () => {
      const filteredImages = [];
      item.postMedia.forEach((singleMedia) => {
        if (
          singleMedia.mime &&
          singleMedia.mime.startsWith('image') &&
          singleMedia.url
        ) {
          filteredImages.push(singleMedia.url);
        }

        if (singleMedia && !singleMedia.mime) {
          filteredImages.push(singleMedia);
        }
      });

      onImagePress(filteredImages, index);
    };

    const onMediaFilePress = () => {
      if (isVideo) {
        onVideoMediaPress(media.url);
        return;
      }
      onImageMediaPress();
    };

    const rendenderMediaFile = () => {
      if (isVideo) {
        return (
          <>
            <Video
              ref={videoRef}
              source={{ uri: cachedVideo }}
              posterSource={{ uri: cachedImage }}
              posterStyle={{ resizeMode: 'cover' }}
              onLoad={onVideoLoad}
              resizeMode={'cover'}
              onLoadStart={onVideoLoadStart}
              style={[dynamicStyles.bodyImage]}
              usePoster={!!media.thumbnailURL}
            />
            <TNTouchableIcon
              onPress={onSoundPress}
              imageStyle={dynamicStyles.soundIcon}
              containerStyle={dynamicStyles.soundIconContainer}
              iconSource={
                isVideoMuted
                  ? AppStyles.iconSet.soundMute
                  : AppStyles.iconSet.sound
              }
              appStyles={AppStyles}
            />
          </>
        );
      }
      return (
        <Image
          source={{ uri: cachedImage }}
          style={dynamicStyles.bodyImage}
          // indicator={CircleSnail}
          indicatorProps={circleSnailProps}
        />
      );
    };

    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onMediaFilePress}>
        {rendenderMediaFile()}
      </TouchableOpacity>
    );
  },
);

export default FeedMedia;
