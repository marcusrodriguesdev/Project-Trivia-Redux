import { combineReducers } from 'redux';
import userInfo from './storeToken';

const rootReducer = combineReducers({
  userInfo,
});

export default rootReducer;
