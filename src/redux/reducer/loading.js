import { LOADING } from '../actions/index';

const INITIAL_STATE = {
  loading: true,
};

function loading(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING:
    return { loading: false };
  default:
    return state;
  }
}

export default loading;
