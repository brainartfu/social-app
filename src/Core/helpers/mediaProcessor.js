import { Platform } from 'react-native';
import * as _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import { createThumbnail } from 'react-native-create-thumbnail';
import { RNFFmpeg } from 'react-native-ffmpeg';
import ImageResizer from 'react-native-image-resizer';
import uuidv4 from 'uuidv4';

const BASE_DIR = `${FileSystem.cacheDirectory}expo-cache/`;

// Checks if given directory exists. If not, creates it
async function ensureDirExists(givenDir) {
  const dirInfo = await FileSystem.getInfoAsync(givenDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(givenDir, { intermediates: true });
  }
}

const compressVideo = async (sourceUri) => {
  await ensureDirExists(BASE_DIR);
  const processedUri = `${BASE_DIR}${uuidv4()}.mp4`;
  return new Promise((resolve) => {
    RNFFmpeg.execute(`-i ${sourceUri} -c:v mpeg4 ${processedUri}`).then(
      (result) => {
        console.log('did compressVideo  processedUri++++', processedUri);
        resolve(processedUri);
      },
    );
  });
};

const createThumbnailFromVideo = (videoUri) => {
  let processedUri = videoUri;
  if (Platform.OS === 'android' && !processedUri.includes('file:///')) {
    processedUri = `file://${processedUri}`;
  }
  return new Promise((resolve) => {
    createThumbnail({ url: processedUri }).then((newThumbnailSource) => {
      resolve(newThumbnailSource.path);
    });
  });
};

const resizeImage = async (
  {
    image,
    newWidth = 1100,
    newHeight = 1100,
    compressFormat = 'JPEG',
    quality = 100,
  },
  callback,
) => {
  const imagePath = image?.path || image?.uri;

  if (image?.height < newHeight) {
    callback(imagePath);
    return;
  }

  ImageResizer.createResizedImage(
    imagePath,
    newWidth,
    newHeight,
    compressFormat,
    quality,
  )
    .then((newSource) => {
      if (newSource) {
        callback(newSource.uri);
      }
    })
    .catch((err) => {
      callback(imagePath);
    });
};

/**
 * This function takes a media file object as the first argument and callback function as the second argument.
 * The media file object can either be a photo object or a video object.
 * If the media file is a photo object, this function resizes the photo and calls the callback function with an object of a processed uri.
 * If the media file is a video object, this function compresses the video file and creates a thumbnail from the compressed file. Then
 * calls the callback function with an object of a processed uri and thumbnail uri.
 * @param {object} file
 * @param {function} callback
 */
export const processMediaFile = (file, callback) => {
  const { mime, type, uri, path } = file;
  const fileSource = uri || path;
  const includesVideo = mime?.includes('video') || type?.includes('video');
  const includesImage = mime?.includes('image') || type?.includes('image');

  if (includesVideo) {
    compressVideo(fileSource).then((processedUri) => {
      createThumbnailFromVideo(processedUri).then((thumbnail) => {
        callback({ thumbnail, processedUri });
      });
    });
    return;
  }

  if (includesImage) {
    resizeImage({ image: file }, (processedUri) => {
      callback({ processedUri });
    });
    return;
  }
  callback({ processedUri: fileSource });
};

export const blendVideoWithAudio = async (
  { videoStream, audioStream, videoRate },
  callback,
) => {
  await ensureDirExists(BASE_DIR);
  const processedUri = `${BASE_DIR}${uuidv4()}.mp4`;
  let command = `-i ${videoStream} -i ${audioStream} -shortest ${processedUri}`;

  if (videoRate) {
    command = `-i ${videoStream} -i ${audioStream} -filter:v "setpts=PTS/${videoRate}" -shortest ${processedUri}`;
  }

  RNFFmpeg.execute(command).then((result) => {
    callback(processedUri);
  });
};
