import axios from 'axios';

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
  const request = await axios('https://opentdb.com/api_token.php?command=request');
  return dispatch(setToken(request.data.token));
};
