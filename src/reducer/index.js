import { combineReducers } from 'redux';
import loginReducer from './login';
import scoreReducer from './score';

const rootReducer = combineReducers({
  loginReducer,
  scoreReducer,
});

export default rootReducer;
