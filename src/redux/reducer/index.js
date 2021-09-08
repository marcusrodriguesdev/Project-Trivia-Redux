import { combineReducers } from 'redux';
import loading from './loading';
import gamePage from './gamePage';
import player from './reducer';

const rootReducer = combineReducers({ player, gamePage, loading });

export default rootReducer;
