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
} from '../reducer/user';

function emailCheckAPI(data) {
  return axios.post('/v1/emailCheck', data);
}
function* emailCheck(action) {
  try {
    console.log(action.data);
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
    console.log(action.data);
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

function* watchEmailCheck() {
  yield takeLatest(EMAIL_CHECK_REQUEST, emailCheck);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

export default function* userSaga() {
  yield all([fork(watchEmailCheck), fork(watchSignUp), fork(watchLogin), fork(watchLoadMyInfo)]);
}
