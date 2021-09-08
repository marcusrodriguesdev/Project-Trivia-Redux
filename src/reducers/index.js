import { combineReducers } from 'redux';
import user from './userReducer';
import settings from './settingsReducer';

const rootReducer = combineReducers({ user, settings });

export default rootReducer;
