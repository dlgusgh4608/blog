import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import axios from 'axios';
import {
  EMAIL_CHECK_REQUEST,
  EMAIL_CHECK_FAILURE,
  EMAIL_CHECK_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_SUCCESS,
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_IMAGE_FAILURE,
  CHANGE_IMAGE_REQUEST,
  CHANGE_IMAGE_SUCCESS,
} from '../reducer/user';

function emailCheckAPI(data) {
  return axios.post('/v1/emailCheck', data);
}
function* emailCheck(action) {
  try {
    const result = yield call(emailCheckAPI, action.data);
    yield put({
      type: EMAIL_CHECK_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: EMAIL_CHECK_FAILURE,
      error: e.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/v1/signUp', data);
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: e.response.data,
    });
  }
}

function loginAPI(data) {
  return axios.post('/v1/login', data);
}
function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGIN_FAILURE,
      error: e.response.data,
    });
  }
}

function logoutAPI(data) {
  return axios.post('/v1/logout', data);
}
function* logout(action) {
  try {
    const result = yield call(logoutAPI, action.data);
    yield put({
      type: LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
      error: e.response.data,
    });
  }
}

function loadMyInfoAPI() {
  return axios.get('/v1/user');
}
function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: e.response.data,
    });
  }
}

function loadUserInfoAPI(data) {
  return axios.post('/v1/user', data);
}
function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.data);
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: e.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.post('/v1/nickname', data);
}
function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: e.response.data,
    });
  }
}

function changePasswordAPI(data) {
  return axios.post('/v1/password', data);
}
function* changePassword(action) {
  try {
    const result = yield call(changePasswordAPI, action.data);
    yield put({
      type: CHANGE_PASSWORD_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: CHANGE_PASSWORD_FAILURE,
      error: e.response.data,
    });
  }
}

function changeImageAPI(data) {
  return axios.post('/v1/image', data);
}
function* changeImage(action) {
  try {
    const result = yield call(changeImageAPI, action.data);
    yield put({
      type: CHANGE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: CHANGE_IMAGE_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchEmailCheck() {
  yield takeLatest(EMAIL_CHECK_REQUEST, emailCheck);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchLoadUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}
function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword);
}
function* watchChangeImage() {
  yield takeLatest(CHANGE_IMAGE_REQUEST, changeImage);
}

export default function* userSaga() {
  yield all([
    fork(watchEmailCheck),
    fork(watchSignUp),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadMyInfo),
    fork(watchLoadUserInfo),
    fork(watchChangeNickname),
    fork(watchChangePassword),
    fork(watchChangeImage),
  ]);
}
