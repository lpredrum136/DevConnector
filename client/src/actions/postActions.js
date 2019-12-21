import axios from 'axios';
import { setAlert } from './alertActions';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';

// Get posts
export const getPosts = () => {
  const dispatchGetPosts = async dispatch => {
    try {
      const res = await axios.get('/api/posts');

      dispatch({ type: GET_POSTS, payload: res.data });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchGetPosts;
};

// Add like
export const addLike = postId => {
  const dispatchAddLike = async dispatch => {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);

      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: res.data }
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchAddLike;
};

// Remove like
export const removeLike = postId => {
  const dispatchRemoveLike = async dispatch => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);

      dispatch({
        type: UPDATE_LIKES,
        payload: { postId, likes: res.data }
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchRemoveLike;
};

// Add post
export const addPost = formData => {
  const dispatchAddPost = async dispatch => {
    try {
      const res = await axios.post('api/posts/', formData);
      dispatch({ type: ADD_POST, payload: res.data });
      dispatch(setAlert('Post created', 'success'));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchAddPost;
};

// Delete Post
export const deletePost = postId => {
  const dispatchDeletePost = async dispatch => {
    try {
      await axios.delete(`api/posts/${postId}`);

      dispatch({ type: DELETE_POST, payload: postId });

      dispatch(setAlert('Post removed', 'success'));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchDeletePost;
};

// Get post
export const getPost = postId => {
  const dispatchGetPost = async dispatch => {
    try {
      const res = await axios.get(`/api/posts/${postId}`);
      dispatch({ type: GET_POST, payload: res.data });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchGetPost;
};

// Add comment
export const addComment = (postId, formData) => {
  const dispatchAddComment = async dispatch => {
    try {
      const res = await axios.post(`/api/posts/comment/${postId}`, formData);
      dispatch({ type: ADD_COMMENT, payload: res.data });
      dispatch(setAlert('Comment Added', 'success'));
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors)
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchAddComment;
};

// Delete comment
export const deleteComment = (postId, commentId) => {
  const dispatchDeleteComment = async dispatch => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

      dispatch({ type: REMOVE_COMMENT, payload: commentId });
      dispatch(setAlert('Comment removed', 'success'));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  };

  return dispatchDeleteComment;
};
