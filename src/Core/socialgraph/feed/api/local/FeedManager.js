/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

import {
  setMainFeedPosts,
  setDiscoverFeedPosts,
  setFeedPostReactions,
  setMainStories,
  setCurrentUserFeedPosts,
} from '../../redux';
import { mockStoriesData, mockPostsData } from './localData';

export default class FeedManager {
  constructor(reduxStore, currentUserID) {
    this.reduxStore = reduxStore;
    this.currentUserID = currentUserID;
    this.subscribeIfNeeded();
  }

  subscribeIfNeeded = () => {
    this.reduxStore.dispatch(setMainStories(mockStoriesData));
    this.reduxStore.dispatch(setDiscoverFeedPosts(mockPostsData));
    this.reduxStore.dispatch(setFeedPostReactions([]));
    this.reduxStore.dispatch(setCurrentUserFeedPosts(mockPostsData));
    this.reduxStore.dispatch(setMainFeedPosts(mockPostsData));
  };
  unsubscribe = () => {};
}
