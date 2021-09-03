import { combineReducers } from 'redux';
import reducer from './reducer';
import userReducer from './userReducer';

const rootReducers = combineReducers({ reducer, userReducer });

export default rootReducers;
