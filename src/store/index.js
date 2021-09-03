import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';

const store = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(
    applyMiddleware(thunk),
  ),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
