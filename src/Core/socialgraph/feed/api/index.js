// Uncomment these if you want to remove firebase and add your own custom backend:
// import * as postAPIManager from './local/post';
// import * as storyAPIManager from './local/story';
// import * as commentAPIManager from './local/comment';
// import FeedManager from './local/FeedManager';
// export { postAPIManager, storyAPIManager, commentAPIManager, FeedManager };

// Remove these lines if you want to remove firebase and add your own custom backend:
import * as postAPIManager from './firebase/post';
import * as storyAPIManager from './firebase/story';
import * as commentAPIManager from './firebase/comment';
import FeedManager from './firebase/FeedManager';
export { postAPIManager, storyAPIManager, commentAPIManager, FeedManager };
