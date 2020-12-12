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

function* loadMainPosts(action) {
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
  return axios.post('/v1/loadUserPosts', data);
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

function* watchImageUpload() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, imageUpload);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
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

export default function* postSaga() {
  yield all([fork(watchImageUpload), fork(watchAddPost), fork(watchLoadPost), fork(watchLoadMainPosts), fork(watchLoadUserPosts)]);
}
