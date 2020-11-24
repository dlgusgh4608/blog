import { all, call, put, takeLatest, fork } from 'redux-saga/effects';
import axios from 'axios';
import { EMAIL_CHECK_REQUEST, EMAIL_CHECK_FAILURE, EMAIL_CHECK_SUCCESS } from '../reducer/user';

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

function* watchEmailCheck() {
  yield takeLatest(EMAIL_CHECK_REQUEST, emailCheck);
}

export default function* userSaga() {
  yield all([fork(watchEmailCheck)]);
}
