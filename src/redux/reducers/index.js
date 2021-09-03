import { combineReducers } from 'redux';
import playReducer from './play';
import questionReducer from './question';

const rootReducers = combineReducers({
  user: playReducer,
  results: questionReducer,
});

export default rootReducers;
