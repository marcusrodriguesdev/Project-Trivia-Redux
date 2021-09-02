import { getToken } from '../../services/questionApi';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';

export function requestToken() {
  return ({ type: REQUEST_TOKEN });
}

export function setToken(token) {
  return ({ type: SET_TOKEN, payload: token });
}

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken);

  const token = await getToken();

  return dispatch(setToken(token));
};
