import { createStore } from 'redux';
import { componentWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  componentWithDevTools(),
);

export default store;
