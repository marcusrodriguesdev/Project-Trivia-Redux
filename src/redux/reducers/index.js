import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import gameReducer from './gameReducer';
import configReducer from './configReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  game: gameReducer,
  config: configReducer,
});

export default rootReducer;
