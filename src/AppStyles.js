import { Platform, Dimensions, I18nManager } from 'react-native';
import TNColor from './Core/truly-native/TNColor';
import { AppleButton } from '@invertase/react-native-apple-authentication';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const darkColorSet = {
  mainThemeBackgroundColor: '#121212',
  mainThemeForegroundColor: '#3875e8',
  mainTextColor: '#ffffff',
  mainSubtextColor: '#f5f5f5',
  hairlineColor: '#222222',
  grey0: TNColor('#eaeaea'),
  grey3: TNColor('#e6e6f2'),
  grey6: TNColor('#d6d6d6'),
  grey9: TNColor('#939393'),
  tint: '#3068CC',
  facebook: '#4267b2',
  grey: 'grey',
  whiteSmoke: '#222222',
  headerTintColor: '#ffffff',
  bottomTintColor: 'lightgrey',
  mainButtonColor: '#062246',
  subButtonColor: '#20242d',
};

const lightColorSet = {
  mainThemeBackgroundColor: '#ffffff',
  mainThemeForegroundColor: '#3875e8',
  mainTextColor: '#151723',
  mainSubtextColor: '#7e7e7e',
  hairlineColor: '#e0e0e0',
  grey0: '#eaeaea',
  grey3: '#e6e6f2',
  grey6: '#d6d6d6',
  grey9: '#939393',
  tint: '#3068CC',
  facebook: '#4267b2',
  grey: 'grey',
  whiteSmoke: '#f5f5f5',
  headerTintColor: '#000000',
  bottomTintColor: 'grey',
  mainButtonColor: '#e8f1fd',
  subButtonColor: '#eaecf0',
};

const colorSet = {
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
};

const navLight = {
  backgroundColor: '#fff',
  fontColor: '#000',
  activeTintColor: '#3875e8',
  inactiveTintColor: '#ccc',
  hairlineColor: '#e0e0e0',
};

const navDark = {
  backgroundColor: '#000',
  fontColor: '#fff',
  activeTintColor: '#3875e8',
  inactiveTintColor: '#888',
  hairlineColor: '#222222',
};

const navThemeConstants = {
  light: navLight,
  dark: navDark,
  main: '#3875e8',
  'no-preference': navLight,
};

const imageSet = {
  chat: require('../assets/images/chat.png'),
  file: require('../assets/images/file.png'),
  like: require('../assets/images/like.png'),
  notification: require('../assets/images/notification.png'),
  photo: require('../assets/images/photo.png'),
  pin: require('../assets/images/pin.png'),
};

const iconSet = {
  logo: require('../assets/images/app-logo.png'),
  userAvatar: require('./CoreAssets/default-avatar.jpg'),
  backArrow: require('./CoreAssets/arrow-back-icon.png'),
  menuHamburger: require('../assets/icons/menu-hamburger.png'),
  homeUnfilled: require('../assets/icons/home-unfilled.png'),
  homefilled: require('../assets/icons/home-filled.png'),
  home_android: require('../assets/icons/home-icon-24.png'),
  search: require('../assets/icons/search.png'),
  magnifier: require('../assets/icons/magnifier.png'),
  commentUnfilled: require('../assets/icons/comment-unfilled.png'),
  commentFilled: require('../assets/icons/comment-filled.png'),
  friendsUnfilled: require('../assets/icons/friends-unfilled.png'),
  friendsFilled: require('../assets/icons/friends-filled.png'),
  profileUnfilled: require('../assets/icons/profile-unfilled.png'),
  profileFilled: require('../assets/icons/profile-filled.png'),
  camera: require('../assets/icons/camera.png'),
  cameraFilled: require('../assets/icons/camera-filled.png'),
  inscription: require('../assets/icons/inscription.png'),
  more: require('../assets/icons/more.png'),
  send: require('../assets/icons/send.png'),
  pinpoint: require('../assets/icons/pinpoint.png'),
  checked: require('../assets/icons/checked.png'),
  bell: require('../assets/icons/bell.png'),
  surprised: require('../assets/icons/wow.png'),
  laugh: require('../assets/icons/crylaugh.png'),
  cry: require('../assets/icons/crying.png'),
  thumbsupUnfilled: require('../assets/icons/thumbsup-unfilled.png'),
  heartUnfilled: require('../assets/icons/heart-unfilled.png'),
  like: require('../assets/icons/blue-like.png'),
  love: require('../assets/icons/red-heart.png'),
  angry: require('../assets/icons/anger.png'),
  cameraRotate: require('../assets/icons/camera-rotate.png'),
  videoCamera: require('../assets/icons/video-camera.png'),
  libraryLandscape: require('../assets/icons/library-landscape.png'),
  playButton: require('../assets/icons/play-button.png'),
  logout: require('../assets/icons/logout-drawer.png'),
  sound: require('../assets/icons/sound.png'),
  soundMute: require('../assets/icons/sound_mute.png'),
  users_android: require('../assets/icons/users-icon-48.png'),
  user_android: require('../assets/icons/account-detail.png'),
};

const fontFamily = {
  boldFont: '',
  semiBoldFont: '',
  regularFont: '',
  mediumFont: '',
  lightFont: '',
  extraLightFont: '',
};

const fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
  title: 30,
  content: 20,
};

const loadingModal = {
  color: '#FFFFFF',
  size: 20,
  overlayColor: 'rgba(0,0,0,0.5)',
  closeOnTouch: false,
  loadingType: 'Spinner', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
};

const sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 25,
};

const styleSet = {
  menuBtn: {
    container: {
      backgroundColor: colorSet.grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    icon: {
      tintColor: 'black',
      width: 15,
      height: 15,
    },
  },
  searchBar: {
    container: {
      marginLeft: Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1,
    },
    input: {
      backgroundColor: colorSet.inputBgColor,
      borderRadius: 10,
      color: 'black',
    },
  },
  rightNavButton: {
    marginRight: 10,
  },
  borderRadius: {
    main: 25,
    small: 5,
  },
  textInputWidth: {
    main: '80%',
  },
  backArrowStyle: {
    resizeMode: 'contain',
    tintColor: '#3875e8',
    width: 25,
    height: 25,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 10,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
  },
};

const appleButtonStyle = {
  dark: AppleButton?.Style?.WHITE,
  light: AppleButton?.Style?.BLACK,
  'no-preference': AppleButton?.Style?.WHITE,
};

const StyleDict = {
  imageSet,
  iconSet,
  fontFamily,
  colorSet,
  navThemeConstants,
  fontSet,
  sizeSet,
  styleSet,
  loadingModal,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  appleButtonStyle,
};

export default StyleDict;
