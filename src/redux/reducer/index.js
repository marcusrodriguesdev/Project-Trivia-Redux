import { combineReducers } from 'redux';
import loading from './loading';
import gamePage from './gamePage';
import player from './reducer';
import settings from './settings';

const rootReducer = combineReducers({ player, gamePage, loading, settings });

export default rootReducer;
