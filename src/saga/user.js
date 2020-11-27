import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import axios from 'axios';
import { EMAIL_CHECK_REQUEST, EMAIL_CHECK_FAILURE, EMAIL_CHECK_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducer/user';

function emailCheckAPI(data) {
  return axios.post('http://localhost:5000/api/v1/emailCheck', data);
}

function signUpAPI(data) {
  return axios.post('http://localhost:5000/api/v1/signUp', data);
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

function* watchEmailCheck() {
  yield takeLatest(EMAIL_CHECK_REQUEST, emailCheck);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchEmailCheck), fork(watchSignUp)]);
}
