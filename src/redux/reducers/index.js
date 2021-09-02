import { combineReducers } from 'redux';
import playReducer from './play';

const rootReducers = combineReducers({
  user: playReducer,
});

export default rootReducers;
