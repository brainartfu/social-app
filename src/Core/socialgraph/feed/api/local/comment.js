/**
 * Implement These Methods If You Are Adding Your Own Custom Backend
 */

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @userID - The ID of the user whose profile we're trying to get their comments
 *
 * @postId - A callback method that gets called every time changes are identified in the server-side comment
 **/
export const subscribeToUserReactions = (userID, callback) => {
  // initialise reactionsRef
  // subscribe to the reactions collection based on userId
  // every time there are changes in reactions server side, we call the callback, e.g.
  // callback(reactions)
  // format of reactions:
  // {createdAt, postID, reaction, reactionAuthorID}
  // return reactionsRef object that unsubscribes this listener
  const reactionRef = null;
  const reaction = {
    createdAt: 'February 28, 2020 at 11:00:02 PM UTC+1',
    postID: 'oEaRazWHQJlteGjLuXtM',
    reaction: 'love',
    reactionAuthorID: 'i9OKO3xUufbUyaRbC3vtr2A8kF23',
  };
  if (reaction.reactionAuthorID === userID) {
    callback([...reaction]);
  }

  return reactionRef;
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @userID - The ID of the user whose profile we're trying to get their comments
 *
 * @postId - A callback method that gets called every time changes are identified in the server-side comment
 **/
export const subscribeComments = (postId, callback) => {
  // every time there are changes in reactions server side, we call the callback, e.g.
  // callback(newComment)
  // format of comment:
  // {
  //   authorID,
  //   commentID,
  //   commentText,
  //   createdAt,
  //   id,
  //   postID,
  // }
  // return commentRef object that unsubscribes this listener

  // initialise commentsRef
  const commentRef = null;
  const comment = {
    authorID: 'baXRjw3lIihmEOyqcXmN7mwuw0J2',
    commentID: '0BUYKSyKGykvtigzU0ER',
    commentText: 'Asik bgt Ni bangunan ',
    createdAt: 'April 14, 2020 at 5:47:32 AM UTC+1',
    id: '0BUYKSyKGykvtigzU0ER',
    postID: 'SJIi6v1mzXd8PxRumMk9',
    profilePictureURL:
      'https://i.pinimg.com/originals/fb/d7/2a/fbd72a1440f9b17f09d1fb9cc5ffcef6.jpg',
    firstName: 'caterina Marcu',
  };
  callback([comment]);
  return commentRef;
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @userID - The ID of the user whose profile we're trying to get their reaction
 *
 * @postId - A callback method that gets called every time changes are identified in the server-side reaction
 **/
export const subscribeReactions = (callback, postId) => {
  // initialise reactionsRef
  // subscribe to the reactions collection using reactionsRef
  // format reactions
  // every time there are changes in reactions server side, we return callback(callback(formattedReactions)) from the listener
  //

  const reactionRef = null;
  const reaction = {
    createdAt: 'February 28, 2020 at 11:00:02 PM UTC+1',
    postID: 'oEaRazWHQJlteGjLuXtM',
    reaction: 'love',
    reactionAuthorID: 'i9OKO3xUufbUyaRbC3vtr2A8kF23',
  };
  if (reaction.postID === postId) {
    callback(reaction);
  }

  return reactionRef;
};

/**
 * Removes post from all friends timeline
 *
 * Parameters
 *
 * @userID - The ID of the user whose profile we're trying to get their reaction
 *
 * @callback - A callback method that gets called every time changes are identified in the server-side reaction
 **/
export const getUserReactions = (userId, callback) => {
  // subscribe to the reactions collection, based on userID
  // every time there are changes in reactions server side, we call the callback, e.g.
  // callback({reaction: object, fetchCompleted: boolean})
  const reaction = {
    createdAt: 'February 28, 2020 at 11:00:02 PM UTC+1',
    postID: 'oEaRazWHQJlteGjLuXtM',
    reaction: 'love',
    reactionAuthorID: 'i9OKO3xUufbUyaRbC3vtr2A8kF23',
  };
  callback({ reaction, fetchCompleted: true });
};

/**
 * Add a reaction
 *
 * Parameters
 *
 * @comment - The comment to be submitted
 * 
 * format of comment: 
 * 
 {
    authorID,
    commentID,
    commentText,
    createdAt,
    id,
    postID,
  }
 *
 * @commentAuthor - The user object of the user that adds the comment
 *
 * @post - The post object being updated
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
 * @followEnabled - A boolean that signifies whether the follow is enabled
 *
 * returns response object
 **/
export const addComment = async (
  comment,
  commentAuthor,
  post,
  followEnabled,
) => {
  // update comment
  // send out notification
  // update timeline
  // return { success: true, id: ref.id } or return { error, success: false };
  return { error, success: false };
};

/**
 * Delete a reaction
 *
 * Parameters
 *
 * @reaction - The reaction object
 * 
 * format of reaction
 * 
 {
    createdAt,
    postID,
    reaction,
    reactionAuthorID,
  };
 *
 * 
 * @user - user object
 * 
 * format of user
 * 
    {
      email,
      id,
      ....
    },
 * 
 * @post - The reaction being sent
 * 
 * @followEnabled - 
 * 
 **/
export const handleReaction = async (reaction, user, post, followEnabled) => {
  const postId = post.id;
  if (!postId || !user?.id) {
    alert('Missing post or user. Please try again!');
    return;
  }
  // update reactions by the user on the backend for the target post
  // Send push notification to author
};

/**
 * Delete a reaction
 *
 * Parameters
 *
 * @userId - The id of the user deleting the reaction
 *
 * @postId - The postID of reaction is being deleted
 **/
export const deleteReaction = async (userId, postId) => {
  // delete reaction
};

/**
 * Update rection for user's followers
 *
 * Parameters
 *
 * @post - The post of reaction is being updated
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
 * */
export const updateReactionsCountForFollowers = async (post) => {
  // After we added the reaction to the reactions table (the main source of truth for reactions), update the counts in the timeline of all people seeing this post
  // We compute the canonical reactions count
  // We update the canonical entry
  // We get all friends of the author and update their timelines
};

/**
 * After we added the reaction to the reactions table (the main source of truth for reactions), update the counts in the timeline of all people seeing this post
 * We compute the canonical reactions count
 * We update the canonical entry
 * We get all friends of the author and update their timelines
 *
 * Parameters
 *
 * @post - The post of reaction is being updated
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
 * */
const updateReactionsCountForFriends = async (post) => {
  // Fetch the current comment count
  // Update canonical posts table
  // We fetch all users who follow the author of the post and update their timelines
};

/**
 * Parameters
 *
 * @comment - The comment to be updated
 *
 * */
const updateCommentCountOnAllTimelines = async (comment) => {
  // Fetch the current comment count
  // Update canonical posts table
  // We fetch all friends of the author of the post and update their timelines
};
