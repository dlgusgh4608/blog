import { fork, all } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import postSaga from './post';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000/api';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
