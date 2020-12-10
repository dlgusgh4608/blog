import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { UPLOAD_IMAGE_FAILURE, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS } from '../reducer/post';

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

function* watchImageUpload() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, imageUpload);
}

export default function* postSaga() {
  yield all([fork(watchImageUpload)]);
}
