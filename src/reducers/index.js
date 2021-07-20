import postsReducer from './posts-reducer';
import usersReducer from './users-reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
});
