import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
// or import {composeWithDevTools} from 'redux-devtools-extension'

const initialState = {};

const middleware = [thunk];

const myStore = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // if use composeWithDevTools, delete this line
  )
);

export default myStore;
