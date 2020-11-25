import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import axios from 'axios';
import { EMAIL_CHECK_REQUEST, EMAIL_CHECK_FAILURE, EMAIL_CHECK_SUCCESS, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../reducer/user';

function emailCheckAPI(data) {
  return axios.post('http://localhost:5000/api/v1/emailCheck', data);
}

function signupAPI(data) {
  return axios.post('http://localhost:5000/api/v1/signup', data);
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

function* signup(action) {
  try {
    console.log(action.data);
    const result = yield call(signupAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: SIGNUP_FAILURE,
      error: e.response.data,
    });
  }
}

function* watchEmailCheck() {
  yield takeLatest(EMAIL_CHECK_REQUEST, emailCheck);
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([fork(watchEmailCheck), fork(watchSignup)]);
}
