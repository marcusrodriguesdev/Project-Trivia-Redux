import { combineReducers } from 'redux';
import myReducer from './myReducer';
import user from './user';

const rootReducer = combineReducers({ myReducer, user });

export default rootReducer;
