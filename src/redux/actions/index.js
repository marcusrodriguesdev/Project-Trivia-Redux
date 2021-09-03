import { getToken } from '../../services/questionApi';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_GRAVATAR = 'SET_GRAVATAR';
export const SET_PLAYER = 'SET_PLAYER';

export function requestToken() {
  return ({ type: REQUEST_TOKEN });
}

export function setToken(token) {
  return ({ type: SET_TOKEN, payload: token });
}

export function setGravatar(gravatar) {
  return ({ type: SET_GRAVATAR, payload: gravatar });
}

export function setPlayerData(name, email) {
  return ({ type: SET_PLAYER, payload: { name, email } });
}

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken);

  const token = await getToken();

  return dispatch(setToken(token));
};
