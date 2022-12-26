import { storageAPI, authAPI } from '../../../../api';
import { ErrorCode } from '../../ErrorCode';
import Geolocation from '@react-native-community/geolocation';
import * as Facebook from 'expo-facebook';
import * as Location from 'expo-location';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { IMLocalized } from '../../../../localization/IMLocalization';

const defaultProfilePhotoURL =
  'https://www.wpg.one/wp-content/uploads/2019/06/empty-avatar.jpg';

const validateUsernameFieldIfNeeded = (inputFields, appConfig) => {
  return new Promise((resolve, reject) => {
    const usernamePattern = /^[aA-zZ]\w{3,29}$/;

    if (!appConfig.isUsernameFieldEnabled) {
      resolve({ success: true });
    }
    if (
      appConfig.isUsernameFieldEnabled &&
      !inputFields?.hasOwnProperty('username')
    ) {
      resolve({ error: IMLocalized('Invalid username') });
    }

    !usernamePattern.test(inputFields.username) &&
      resolve({ error: IMLocalized('Invalid username') });
    authAPI
      .checkUniqueUsername(inputFields.username?.toLowerCase())
      .then(({ isUnique, taken }) => {
        isUnique && resolve({ success: isUnique });
        taken && resolve({ error: IMLocalized('Username is taken') });
      })
      .catch((error) => {
        error && resolve({ error: IMLocalized('Network error') });
      });
  });
};

const loginWithEmailAndPassword = (email, password) => {
  return new Promise(function (resolve, _reject) {
    authAPI.loginWithEmailAndPassword(email, password).then((response) => {
      if (!response.error) {
        handleSuccessfulLogin({ ...response.user }, false).then((res) => {
          // Login successful, push token stored, login credential persisted, so we log the user in.
          resolve({ user: res.user });
        });
      } else {
        resolve({ error: response.error });
      }
    });
  });
};

const onVerification = (phone) => {
  authAPI.onVerificationChanged(phone);
};

const createAccountWithEmailAndPassword = (userDetails, appConfig) => {
  const { photoFile } = userDetails;
  const accountCreationTask = (userData) => {
    return new Promise((resolve, _reject) => {
      authAPI
        .register(userData, appConfig.appIdentifier)
        .then(async (response) => {
          if (response.error) {
            resolve({ error: response.error });
          } else {
            // We created the user succesfully, time to upload the profile photo and update the users table with the correct URL
            let user = response.user;
            if (photoFile) {
              storageAPI
                .processAndUploadMediaFile(photoFile)
                .then((response) => {
                  if (response.error) {
                    // if account gets created, but photo upload fails, we still log the user in
                    resolve({
                      nonCriticalError: response.error,
                      user: {
                        ...user,
                        profilePictureURL: defaultProfilePhotoURL,
                      },
                    });
                  } else {
                    authAPI
                      .updateProfilePhoto(user.id, response.downloadURL)
                      .then((_result) => {
                        resolve({
                          user: {
                            ...user,
                            profilePictureURL: response.downloadURL,
                          },
                        });
                      });
                  }
                });
            } else {
              resolve({
                user: {
                  ...response.user,
                  profilePictureURL: defaultProfilePhotoURL,
                },
              });
            }
          }
        });
    });
  };

  return new Promise(function (resolve, _reject) {
    const userData = {
      ...userDetails,
      profilePictureURL: defaultProfilePhotoURL,
    };
    accountCreationTask(userData).then((response) => {
      if (response.error) {
        resolve({ error: response.error });
      } else {
        // We signed up successfully, so we are logging the user in (as well as updating push token, persisting credential,s etc.)
        handleSuccessfulLogin(response.user, true).then((response) => {
          resolve({
            ...response,
          });
        });
      }
    });
  });
};

const retrievePersistedAuthUser = () => {
  return new Promise((resolve) => {
    authAPI.retrievePersistedAuthUser().then((user) => {
      if (user) {
        handleSuccessfulLogin(user, false).then((res) => {
          // Persisted login successful, push token stored, login credential persisted, so we log the user in.
          resolve({
            user: res.user,
          });
        });
      } else {
        resolve(null);
      }
    });
  });
};

const sendPasswordResetEmail = (email) => {
  return new Promise((resolve) => {
    authAPI.sendPasswordResetEmail(email);
    resolve();
  });
};

const logout = (user) => {
  const userData = {
    ...user,
    isOnline: false,
  };
  authAPI.updateUser(user.id || user.userID, userData);
  authAPI.logout();
};

const loginOrSignUpWithApple = (appConfig) => {
  return new Promise(async (resolve, _reject) => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      const { identityToken, nonce } = appleAuthRequestResponse;

      authAPI
        .loginWithApple(identityToken, nonce, appConfig.appIdentifier)
        .then(async (response) => {
          if (response?.user) {
            const newResponse = {
              user: { ...response.user },
              accountCreated: response.accountCreated,
            };
            handleSuccessfulLogin(
              newResponse.user,
              response.accountCreated,
            ).then((response) => {
              // resolve(response);
              resolve({
                ...response,
              });
            });
          } else {
            resolve({ error: ErrorCode.appleAuthFailed });
          }
        });
    } catch (error) {
      console.log(error);
      resolve({ error: ErrorCode.appleAuthFailed });
    }
  });
};

const loginOrSignUpWithGoogle = (appConfig) => {
  GoogleSignin.configure({
    webClientId: appConfig.webClientId,
  });
  return new Promise(async (resolve, _reject) => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      authAPI
        .loginWithGoogle(idToken, appConfig.appIdentifier)
        .then(async (response) => {
          if (response?.user) {
            const newResponse = {
              user: { ...response.user },
              accountCreated: response.accountCreated,
            };
            handleSuccessfulLogin(
              newResponse.user,
              response.accountCreated,
            ).then((response) => {
              // resolve(response);
              resolve({
                ...response,
              });
            });
          } else {
            resolve({ error: ErrorCode.GOOGLE_SIGN_IN_FAILED });
          }
        });
    } catch (error) {
      console.log(error);
      resolve({
        error: ErrorCode.GOOGLE_SIGN_IN_FAILED,
      });
    }
  });
};

const loginOrSignUpWithFacebook = (appConfig) => {
  Facebook.initializeAsync(appConfig.facebookIdentifier);

  return new Promise(async (resolve, _reject) => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        authAPI
          .loginWithFacebook(token, appConfig.appIdentifier)
          .then(async (response) => {
            if (response?.user) {
              const newResponse = {
                user: { ...response.user },
                accountCreated: response.accountCreated,
              };
              handleSuccessfulLogin(
                newResponse.user,
                response.accountCreated,
              ).then((response) => {
                // resolve(response);
                resolve({
                  ...response,
                });
              });
            } else {
              resolve({ error: ErrorCode.fbAuthFailed });
            }
          });
      } else {
        resolve({ error: ErrorCode.fbAuthCancelled });
      }
    } catch (error) {
      resolve({ error: ErrorCode.fbAuthFailed });
    }
  });
};

const retrieveUserByPhone = (phone) => {
  return authAPI.retrieveUserByPhone(phone);
};

const sendSMSToPhoneNumber = (phoneNumber, captchaVerifier) => {
  return authAPI.sendSMSToPhoneNumber(phoneNumber, captchaVerifier);
};

const loginWithSMSCode = (smsCode, verificationID) => {
  return new Promise(function (resolve, _reject) {
    authAPI.loginWithSMSCode(smsCode, verificationID).then((response) => {
      if (response.error) {
        resolve({ error: response.error });
      } else {
        // successful phone number login, we fetch the push token
        handleSuccessfulLogin(response.user, false).then((response) => {
          resolve(response);
        });
      }
    });
  });
};

const registerWithPhoneNumber = (
  userDetails,
  smsCode,
  verificationID,
  appIdentifier,
) => {
  const { photoFile } = userDetails;
  const accountCreationTask = (userData) => {
    return new Promise(function (resolve, _reject) {
      authAPI
        .registerWithPhoneNumber(
          userData,
          smsCode,
          verificationID,
          appIdentifier,
        )
        .then((response) => {
          if (response.error) {
            resolve({ error: response.error });
          } else {
            // We created the user succesfully, time to upload the profile photo and update the users table with the correct URL
            let user = response.user;
            if (photoFile) {
              storageAPI
                .processAndUploadMediaFile(photoFile)
                .then((response) => {
                  if (response.error) {
                    // if account gets created, but photo upload fails, we still log the user in
                    resolve({
                      nonCriticalError: response.error,
                      user: {
                        ...user,
                        profilePictureURL: defaultProfilePhotoURL,
                      },
                    });
                  } else {
                    authAPI
                      .updateProfilePhoto(user.id, response.downloadURL)
                      .then((_res) => {
                        resolve({
                          user: {
                            ...user,
                            profilePictureURL: response.downloadURL,
                          },
                        });
                      });
                  }
                });
            } else {
              resolve({
                user: {
                  ...response.user,
                  profilePictureURL: defaultProfilePhotoURL,
                },
              });
            }
          }
        });
    });
  };

  return new Promise(function (resolve, _reject) {
    const userData = {
      ...userDetails,
      profilePictureURL: defaultProfilePhotoURL,
    };
    accountCreationTask(userData).then((response) => {
      if (response.error) {
        resolve({ error: response.error });
      } else {
        handleSuccessfulLogin(response.user, true).then((response) => {
          resolve(response);
        });
      }
    });
  });
};

const handleSuccessfulLogin = (user, accountCreated) => {
  // After a successful login, we fetch & store the device token for push notifications, location, online status, etc.
  // we don't wait for fetching & updating the location or push token, for performance reasons (especially on Android)
  fetchAndStoreExtraInfoUponLogin(user, accountCreated);
  return new Promise((resolve) => {
    resolve({ user: { ...user } });
  });
};

const fetchAndStoreExtraInfoUponLogin = async (user, accountCreated) => {
  authAPI.fetchAndStorePushTokenIfPossible(user);

  getCurrentLocation(Geolocation).then(async (location) => {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    var locationData = {};
    if (location) {
      locationData = {
        location: {
          latitude: latitude,
          longitude: longitude,
        },
      };
      if (accountCreated) {
        locationData = {
          ...locationData,
          signUpLocation: {
            latitude: latitude,
            longitude: longitude,
          },
        };
      }
    }

    const userData = {
      ...locationData,
      isOnline: true,
    };

    authAPI.updateUser(user.id || user.userID, userData);
  });
};

const getCurrentLocation = (geolocation) => {
  return new Promise(async (resolve) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      resolve({ coords: { latitude: '', longitude: '' } });
      return;
    }

    geolocation.getCurrentPosition(
      (location) => {
        console.log(location);
        resolve(location);
      },
      (error) => {
        console.log(error);
      },
    );

    // setRegion(location.coords);
    // onLocationChange(location.coords);

    // geolocation.getCurrentPosition(
    //     resolve,
    //     () => resolve({ coords: { latitude: "", longitude: "" } }),
    //     { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    // );
  });
};

const authManager = {
  validateUsernameFieldIfNeeded,
  retrievePersistedAuthUser,
  loginWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  createAccountWithEmailAndPassword,
  loginOrSignUpWithApple,
  loginOrSignUpWithFacebook,
  sendSMSToPhoneNumber,
  loginWithSMSCode,
  registerWithPhoneNumber,
  retrieveUserByPhone,
  onVerification,
  loginOrSignUpWithGoogle,
};

export default authManager;
