/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

import { mockPostsData } from './localData';

// Mock data format:
// [
//   {
//     author: {
//       id: '113311313',
//       userID: '113311313',
//       stripeCustomerID: 'addddvvd',
//       phone: dummyPhoneNumber,
//       email: 'jane@doe.com',
//       firstName: 'Jane',
//       lastName: 'Doe',
//       profilePictureURL:
//       'https://static2.thethingsimages.com/wordpress/wp-content/uploads/2020/05/15-Sickest-Concept-Cars-In-2020-1.jpg',
//    };
//     authorID: mockUserData.id,
//     commentCount: 0,
//     createdAt: { nanoseconds: 944000000, seconds: 1597890533 },
//     hashtags: [],
//     id: 'ApayhJmrfr6sD5uOzqWQ',
//     location: 'Lagos, Lagos.',
//     postMedia: [
//       {
//         mime: 'image/jpeg',
//         url:
//           'https://firebasestorage.googleapis.com/v0/b/wpgone.appspot.com/o/IMG_20200820_032131_0.jpg?alt=media&token=1f47629c-4680-4714-826c-3a6eb4dd6492',
//       },
//     ],
//     postText: 'Ghh',
//     reactions: {
//       angry: 0,
//       cry: 0,
//       laugh: 0,
//       like: 0,
//       love: 0,
//       sad: 0,
//       surprised: 0,
//     },
//     reactionsCount: 4,
//   },
//    ..
// ]

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @userID - ID of logged in user
 * @callback - A callback method that gets called every time changes are identified in the server-side main_feeds
 **/
export const subscribeToMainFeedPosts = (userID, callback) => {
  const postRef = null;
  // subscribe to the main_feeds collection with a limit of 100 entries
  // every time there are changes in hashtags server side, we call the callback, e.g.
  // callback(feedPosts)
  // return postref
  callback(mockPostsData);
  return postRef;
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @callback - A callback method that gets called every time changes are identified in the server-side channels
 **/
export const subscribeToDiscoverFeedPosts = (callback) => {
  const postRef = null;
  // subscribe to the hashtags collection with a limit of 100 entries
  // every time there are changes in hashtags server side, we call the callback, e.g.
  // callback(posts)
  // return postref
  callback(mockPostsData);
  return postRef;
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @hashtag - The ID of the user whose profile we're trying to subscribe to
 * @callback - A callback method that gets called every time changes are identified in the server-side hashtags
 **/
export const subscribeToHashtagFeedPosts = (hashtag, callback) => {
  const postRef = null;
  // subscribe to the hashtags collection with a limit of 100 entries
  // every time there are changes in hashtags server side, we call the callback, e.g.
  // callback(feedposts)
  // return postref
  callback([]);
  return postRef;
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @userID - The ID of the user whose profile we're trying to subscribe to
 * @callback - A callback method that gets called every time changes are identified in the server-side profile-feeds
 **/
export const subscribeToProfileFeedPosts = (userID, callback) => {
  const postRef = null;
  // subscribe to the posts collection, based on userID
  // every time there are changes in channels server side, we call the callback, e.g.
  // callback(listoffeedposts)
  // return postref
  callback(mockPostsData);
  return postRef;
};

/**
 * Subscribe to a single post
 *
 * Parameters
 *
 * @postID - The ID of the post we're trying to subscribe to
 * @callback - A callback method that gets called every time changes are identified in the server-side single-post
 **/
export const subscribeToSinglePost = (postID, callback) => {
  // if (!postID) {
  //   alert('No post ID in subscribeToSinglePost. Please try again');
  //   return;
  // }
  // subscribe to posts and get post object with same Id as postID
  //
  // call callback(post)
  //
  // call callback(null) if no post is returned
  callback(mockPostsData[2]);
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @destUserID - The ID of the user
 * @sourceUserID - the ID of the author of the post
 **/
export const hydrateFeedForNewFriendship = async (destUserID, sourceUserID) => {
  // we take all posts & stories from sourceUserID and populate the feed & stories of destUserID
  // we subscribe to mainfeedposts collections and update main feed posts
  // unsubscribe
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @destUserID - The ID of the user
 * @post - The ID of the user's oldfriend
 * 
 * format of post:
  {
    author: {
      email,
      id,
      ....
    },
    createdAt,
    authorID: string,
    commentCount: number,
    createdAt: 'string,
    id: string,
    location: ,
    postText,
    reactionsCount,
  }
 * 
 **/
export const removeFeedForOldFriendship = async (destUserID, oldFriendID) => {
  // We remove all posts authored by oldFriendID from destUserID's feed
  // we subscribe to mainfeedposts collections and delete post from old friend timeline
  // unsubscribe
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @reactions - An array of reactions
 * @post - the post object
 * 
 * format of post:
  {
    author: {
      email,
      id,
      ....
    },
    createdAt,
    authorID: string,
    commentCount: number,
    createdAt: 'string,
    id: string,
    location: {latitude:08178746831, longitude: 23231113}
    postText,
    reactionsCount,
  }
 * 
 **/
const filterForReactions = (reactions, post) => {
  // reactions.forEach((reaction) => {
  //   if (reaction.postID === post.id) {
  //     post.userReactions = reaction.reactions.sort((a, b) => {
  //       a = new Date(a.createdAt.seconds);
  //       b = new Date(b.createdAt.seconds);
  //       return a > b ? -1 : a < b ? 1 : 0;
  //     });
  //   }
  // });
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 * @body - body object
 * 
  {
    feedBatchLimit,
    lastVisibleFeed,
    acceptedFriends,
    morePostRef,
    appUser,
    allUsers,
    reactions,
  }
 *
 * returns response object
 * 
 * 
 **/
export const getNewPosts = async (body) => {
  // let {
  //   feedBatchLimit,
  //   lastVisibleFeed,
  //   acceptedFriends,
  //   morePostRef,
  //   appUser,
  //   allUsers,
  //   reactions,
  // } = body;
  // initialize postsRef
  // use postref ot fetch new posts and orderby lastvisiblefeed
  // return {
  //   success: true,
  //   posts,
  //   lastVisibleFeed,
  //   morePostRef: postsSortRef,
  //   userPosts,
  // };
  // or
  // return { success: true, posts: [], lastVisibleFeed, noMorePosts: true };
  return {
    error: 'Oops! an occurred while trying to get post. Please try again.',
    success: false,
  };
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @users - An array of users data
 * 
  [{
    email,
    id,
    ...
  },...]
 * 
 * 
 * @callback - callback to update posts on UI
 *
 * returns the response of callback supplied
 **/
export const subscribeNewPost = (users, callback) => {
  // subscribe for new post based on new users and update user reaction for each post
  // return callback(posts);
  return callback(mockPostsData);
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @postID - The id of the post
 * @followerIDs - the ids of the user's followers
 * @author - The author object
 * 
 * format of author:
    {
      email,
      id,
      ....
    },
 **/
export const addPost = async (post, followerIDs, author) => {
  // update post on the backend using postId
  // for each of the followerIDs update the post for other followers
  //return return response { success: true }; or return { error, success: true };
  return { error: { message: 'Error' }, success: true };
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @postID - The id of the post
 * @post - The post object
 * 
 * format of post:
 {
    author: {
      email,
      id,
      ....
    },
    createdAt,
    authorID: string,
    commentCount: number,
    createdAt: 'string,
    id: string,
    location: ,
    postText,
    reactionsCount,
  }

 * @followerIDs - An array of ids of the user's followers
 *
 * returns response object
 **/
export const updatePost = async (postId, post, followerIDs) => {
  // update post on the backend using postId
  // for each of the followerIDs update the post for other followers
  //return return response { success: true }; or return { error, success: true };
  return { error, success: true };
};

/**
 * Removes post from all friends timeline
 * Parameters
 *
 * @post - The 'post' object
 * 
 * format of post:
 {
    author: {
      email,
      id,
      ....
    },
    createdAt,
    authorID: string,
    commentCount: number,
    createdAt: 'string,
    id: string,
    location: ,
    postText,
    reactionsCount,
  }
 *
 * returns response object
 **/
export const getPost = async (postId) => {
  // initialize postRef using the postId
  // fetch post based on postID
  // if success
  // return { data: { ...post.data(), id: post.id }, success: true };
  // if unsuccessful
  // return {
  //   error: 'Oops! an error occurred. Please try again',
  //   success: false,
  // };
  return {
    error: 'Oops! an error occurred. Please try again',
    success: false,
  };
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @post - The 'post' object
 * 
 * format of post:
 {
    author: {
      email,
      id,
      ....
    },
    createdAt,
    authorID: string,
    commentCount: number,
    createdAt: 'string,
    id: string,
    location: ,
    postText,
    reactionsCount,
  }
 * 
 * @followEnabled - Whether follow is enabled
 *
 * returns response object
 **/
export const deletePost = async (post, followEnabled) => {
  // initialize post using post.id
  // delete post using initialized collection
  // if followEnabled is true call removePostFromAllTimelines else removePostFromAllFriendsTimelines
  // return message object
  // e.g
  // {
  //   message: IMLocalized('Post was successfully deleted.'),
  //   success: true,
  // };

  return {
    error: IMLocalized('Oops! an error occurred. Please try again'),
    success: false,
  };
};

const removePostFromAllTimelines = async (post) => {
  // We fetch all users who follow the author of the post and update their timelines
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @post - The 'post' object
 * 
 * format of post:
 {
    author: {
      email,
      id,
      ....
    },
    createdAt,
    authorID: string,
    commentCount: number,
    createdAt: 'string,
    id: string,
    location: ,
    postText,
    reactionsCount,
  }
 *
 * returns a promise that resolves to user data
 **/
const removePostFromAllFriendsTimelines = async (post) => {
  // subscribe to friendships collection
  // then delete all of them
};

/**
 * A method that creates a new user
 *
 * Parameters
 *
 * @post - The 'post' object
 * 
 * format of post:
 {
    author: {
      email,
      id,
      ....
    },
    createdAt,
    authorID: string,
    commentCount: number,
    createdAt: 'string,
    id: string,
    location: ,
    postText,
    reactionsCount,
  }

 **/
const removePostFromAllEntities = (post) => {
  // check if post has hashtags
  // then loop over post hashtags and delete them
  // commit the operation
};
