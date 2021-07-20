// import _ from 'lodash';
import jsonPlaceholder from '../api/json-placeholder';

// Big action creator that calls the other 2 to get the necessary data into the app
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  const userIds = [...new Set(getState().posts.map(post => post.userId))];
  userIds.forEach(id => dispatch(fetchUser(id)));
  // Lodash version:
  // _.chain(getState().posts)
  //   .map('userId')
  //   .uniq.forEach(id => dispatch(fetchUser(id)))
  //   .value();
};

export const fetchPosts = () => async dispatch => {
  const res = await jsonPlaceholder.get('/posts');
  dispatch({ type: 'FETCH_POSTS', payload: res.data });
};

export const fetchUser = uId => async dispatch => {
  const res = await jsonPlaceholder.get(`/users/${uId}`);
  dispatch({ type: 'FETCH_USER', payload: res.data });
};

// Multiple fetchUser calls issue:
// Lodash Memoized approach:
// const _fetchUser = _.memoize(async (uId, dispatch) => {
//   const res = await jsonPlaceholder.get(`/users/${uId}`);
//   dispatch({ type: 'FETCH_USER', payload: res.data });
// });

// export const fetchUser = uId => dispatch => _fetchUser(uId, dispatch);
