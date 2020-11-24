import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer';
import rootSaga from '../saga';

const sagaMiddleWare = createSagaMiddleWare();
const middlewares = [sagaMiddleWare];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
const store = createStore(reducer, enhancer);

sagaMiddleWare.run(rootSaga);

export default store;
