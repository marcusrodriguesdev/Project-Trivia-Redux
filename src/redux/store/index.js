import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const rootReducer = combineReducers({ reducer });
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
if (window.Cypress) {
  window.store = store;
}

export default store;
