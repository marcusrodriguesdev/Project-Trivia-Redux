import { combineReducers } from 'redux';
import myReducer from './myReducer';
import user from './user';
import config from './config';

const rootReducer = combineReducers({ myReducer, user, config });

export default rootReducer;
