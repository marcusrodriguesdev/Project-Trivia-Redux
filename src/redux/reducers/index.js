import { combineReducers } from 'redux';
import user from './user';
import gravatar from './gravatar';
import quiz from './quiz';

const reducer = combineReducers({ user, gravatar, quiz });

export default reducer;
