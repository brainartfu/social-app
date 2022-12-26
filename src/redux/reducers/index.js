import { combineReducers } from 'redux';
import { auth } from '../../Core/onboarding/redux/auth';
import { friends } from '../../Core/socialgraph/friendships/redux';
import { feed } from '../../Core/socialgraph/feed/redux';
import { chat } from '../../Core/chat/redux';
import { userReports } from '../../Core/user-reporting/redux';
import { notifications } from '../../Core/notifications/redux';

import { users } from '../../Core/users/redux';

const LOG_OUT = 'LOG_OUT';

// combine reducers to build the state
const appReducer = combineReducers({
  auth,
  feed,
  notifications,
  friends,
  chat,
  userReports,
  users,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
