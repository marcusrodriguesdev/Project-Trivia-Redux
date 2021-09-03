import { combineReducers } from 'redux';
import user from './reducer';
import loading from './loading';
import gamePage from './gamePage';

const rootReducer = combineReducers({ user, gamePage, loading });

export default rootReducer;
