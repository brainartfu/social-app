/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

import { mockStoriesData } from './localData';

/**
 * Subscribe to stories collection
 *
 * Parameters
 *
 * @userID - The user id of the logged in user
 *
 * @callback - A callback method that gets called every time changes are identified in the server-side stories
 *
 **/
export const subscribeToStoriesFeed = (userID, callback) => {
  // subscribe to the stories collection based on userID provided
  // every time there are changes in stories server side, we call the callback, e.g.
  // return callback(stories) or callback([]) in case of fails
  const storiesRef = null;
  callback(mockStoriesData);
  return storiesRef;
};

/**
 * Subscribe to friends stories
 *
 * Parameters
 *
 * @friends - An array containing friends object.
 *
 * format of friends:
 *
 * [{id, userId, email,...}]
 *
 * @callback - A callback method that gets called every time changes are identified in the server-side stories
 *
 **/
export const subscribeStories = (friends, callback) => {
  // subscribe to the stories collection
  // every time there are changes in stories server side, we call the callback, e.g.
  // return callback(stories) or callback([])

  return callback(mockStoriesData);
};

/**
 * Add a new story
 *
 * Parameters
 *
 * @story - The story object
 *
 * format of story:
 *
 * {author, authorID, createdAt, id, storyMediaURL, storyType}
 *
 * @followerIDs - the ID of the author's followers
 *
 * @author - The author object
 **/
export const addStory = async (story, followerIDs, author) => {
  // initialize story data
  // upload to server
  // return { success: true, id: ref.id } or { error, success: false };

  return { error, success: false };
};

/**
 * Populate stories of the destUserID
 *
 * Parameters
 *
 * @destUserID - The ID of the user
 * @sourceUserID - the ID of the author of the post
 **/
export const hydrateStoriesForNewFriendship = async (
  destUserID,
  sourceUserID,
) => {
  // we take all stories from sourceUserID and populate the stories of destUserID
};

/**
 * Removes stories for old friends
 *
 * Parameters
 *
 * @destUserID - The ID of the user
 * @sourceID - the ID of the author of the post
 **/
export const removeStoriesForOldFriendship = async (
  destUserID,
  oldFriendID,
) => {
  // We remove all stories authored by oldFriendID from destUserID's stories tray
};
