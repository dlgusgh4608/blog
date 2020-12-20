import { fork, all } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import postSaga from './post';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080/api';

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
