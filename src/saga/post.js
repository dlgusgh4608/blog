import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_SUCCESS,
  LIKE_POST_REQUEST,
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
} from '../reducer/post';

function imageUploadAPI(data) {
  return axios.post('/v1/imageUpload', data);
}

function* imageUpload(action) {
  const result = yield call(imageUploadAPI, action.data);
  try {
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
      error: e.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/v1/addPost', data);
}

function* addPost(action) {
  const result = yield call(addPostAPI, action.data);
  try {
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function updatePostAPI(data) {
  return axios.post('/v1/updatePost', data);
}

function* updatePost(action) {
  const result = yield call(updatePostAPI, action.data);
  try {
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: UPDATE_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.post('/v1/loadPost', data);
}

function* loadPost(action) {
  const result = yield call(loadPostAPI, action.data);
  try {
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function loadMainPostsAPI() {
  return axios.get('/v1/posts');
}

function* loadMainPosts() {
  const result = yield call(loadMainPostsAPI);
  try {
    yield put({
      type: LOAD_MAIN_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_MAIN_POSTS_FAILURE,
      error: e.response.data,
    });
  }
}

function loadUserPostsAPI(data) {
  return axios.post('/v1/userPosts', data);
}

function* loadUserPosts(action) {
  const result = yield call(loadUserPostsAPI, action.data);
  try {
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: e.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/v1/addComment`, data);
}

function* addComment(action) {
  const result = yield call(addCommentAPI, action.data);
  try {
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: e.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/v1/post/${data.postId}/${data.userId}`);
}

function* removePost(action) {
  const result = yield call(removePostAPI, action.data);
  try {
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/v1/like/${data.postId}`);
}

function* likePost(action) {
  const result = yield call(likePostAPI, action.data);
  try {
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LIKE_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/v1/like/${data.postId}`);
}

function* unlikePost(action) {
  const result = yield call(unlikePostAPI, action.data);
  try {
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchImageUpload() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, imageUpload);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}
function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchLoadMainPosts() {
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}
function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

export default function* postSaga() {
  yield all([
    fork(watchImageUpload),
    fork(watchAddPost),
    fork(watchUpdatePost),
    fork(watchLoadPost),
    fork(watchLoadMainPosts),
    fork(watchLoadUserPosts),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ]);
}
