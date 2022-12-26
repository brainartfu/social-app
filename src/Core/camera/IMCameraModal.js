import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
// import Modal from 'react-native-modalbox';
// import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import IMPreCamera from './IMPreCamera';
import IMPostCamera from './IMPostCamera';
import styles from './styles';

class IMCameraModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: Camera.Constants.Type.back,
      flashMode: Camera.Constants.FlashMode.off,
      isCameraPlay: true,
      imageSource: '',
      videoRate: 1,
    };
    this.cameraRef = React.createRef();
  }

  takePicture = async () => {
    if (this.props.useExternalSound) {
      return;
    }
    if (this.cameraRef.current) {
      const options = { quality: 0.5, base64: true, pauseAfterCapture: true };
      const file = await this.cameraRef.current.takePictureAsync(options);
      const uri = file.uri;
      console.log('takePicture', file);
      if (uri) {
        this.onMediaFileAvailable({ uri, type: 'image' });
      }
    }
  };

  recordVideo = async () => {
    if (this.cameraRef.current) {
      try {
        this.props.onStartRecordingVideo && this.props.onStartRecordingVideo();
        const videoRecordPromise = this.cameraRef.current.recordAsync({
          mute: this.props.muteRecord,
        });

        if (videoRecordPromise) {
          const file = await videoRecordPromise;
          const uri = file.uri;
          if (uri) {
            this.onMediaFileAvailable({ uri, type: 'video' });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  stopVideoRecording = () => {
    if (this.cameraRef.current) {
      this.cameraRef.current.stopRecording();
    }
  };

  // onOpenPhotos = async () => {
  //   const pickerMediaType =
  //     ImagePicker.MediaTypeOptions[this.props.pickerMediaType] ??
  //     ImagePicker.MediaTypeOptions.All;
  //   let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(
  //     false,
  //   );

  //   if (permissionResult.granted === false) {
  //     return;
  //   }

  //   let mediaFile = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: pickerMediaType,
  //   });

  //   if (mediaFile.uri) {
  //     this.onMediaFileAvailable(mediaFile);
  //   }
  // };

  onMediaFileAvailable = (mediaFile) => {
    const { uri, type } = mediaFile;
    if (this.props.muteRecord) {
      this.toggleCameraPlay();
      this.props.onStopRecordingVideo(mediaFile, this.state.videoRate);
      return;
    }

    this.setState(
      {
        imageSource: {
          ...mediaFile,
          uri,
          mime: type,
          rate: this.state.videoRate,
        },
      },
      () => {
        this.toggleCameraPlay();
      },
    );
  };

  onFlashToggle = () => {
    let newFlashMode = Camera.Constants.FlashMode.on;

    if (this.state.flashMode === newFlashMode) {
      newFlashMode = Camera.Constants.FlashMode.off;
    }

    if (this.state.flashMode === Camera.Constants.FlashMode.off) {
      newFlashMode = Camera.Constants.FlashMode.auto;
    }

    if (this.state.flashMode === Camera.Constants.FlashMode.auto) {
      newFlashMode = Camera.Constants.FlashMode.on;
    }

    this.setState({
      flashMode: newFlashMode,
    });
  };

  onCameraFlip = () => {
    this.setState({
      cameraType:
        this.state.cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  toggleCameraPlay = () => {
    this.setState((prevState) => ({
      isCameraPlay: !prevState.isCameraPlay,
    }));
  };

  onCancelPostCamera = () => {
    this.cameraRef.current.resumePreview();
    this.toggleCameraPlay();
    this.setState({ imageSource: '' });
    this.props.onCancelPost && this.props.onCancelPost();
  };

  onPost = () => {
    this.props.onImagePost(this.state.imageSource);
    this.toggleCameraPlay();
  };

  onVideoSpeedChange = (newSpeed) => {
    this.setState({
      videoRate: newSpeed,
    });
  };

  onVideoLoadStart = () => { };

  render() {
    const { isCameraOpen, onCameraClose } = this.props;
    const Container = this.props.wrapInModal ? Modal : Fragment;
    const modalProps = {
      style: styles.container,
      visible: isCameraOpen,
      onDismiss: onCameraClose,
      onRequestClose: onCameraClose,
      animationType: 'slide',
    };

    return (
      <Container {...(this.props.wrapInModal ? modalProps : {})}>
        <Camera
          ref={this.cameraRef}
          style={styles.preview}
          type={this.state.cameraType}
          flashMode={this.state.flashMode}
        />
        {this.state.isCameraPlay && (
          <IMPreCamera
            onCameraClose={onCameraClose}
            onCameraFlip={this.onCameraFlip}
            takePicture={this.takePicture}
            flashMode={this.state.flashMode}
            soundTitle={this.props.soundTitle}
            // onOpenPhotos={this.onOpenPhotos}
            onFlashToggle={this.onFlashToggle}
            onSoundPress={this.props.onSoundPress}
            onVideoSpeedChange={this.onVideoSpeedChange}
            record={this.recordVideo}
            soundDuration={this.props.soundDuration}
            stopRecording={this.stopVideoRecording}
            useExternalSound={this.props.useExternalSound}
          />
        )}

        {!!(this.props.mediaSource || this.state.imageSource) &&
          !this.state.isCameraPlay && (
            <IMPostCamera
              onCancel={this.onCancelPostCamera}
              imageSource={
                this.props.muteRecord
                  ? this.props.mediaSource
                  : this.state.imageSource
              }
              onPost={this.onPost}
              onVideoLoadStart={this.onVideoLoadStart}
            />
          )}
      </Container>
    );
  }
}

IMCameraModal.propTypes = {
  isCameraOpen: PropTypes.bool,
  onCameraClose: PropTypes.func,
  onImagePost: PropTypes.func,
};

IMCameraModal.defaultProps = {
  muteRecord: false,
  useExternalSound: false,
  wrapInModal: true,
};

export default IMCameraModal;
