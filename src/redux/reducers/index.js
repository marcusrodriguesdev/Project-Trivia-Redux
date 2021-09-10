import { combineReducers } from 'redux';
import game from './game';
import user from './user';
import config from './config';

const rootReducer = combineReducers({ game, user, config });

export default rootReducer;
