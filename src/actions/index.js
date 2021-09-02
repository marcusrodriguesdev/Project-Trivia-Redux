import fetchApi from '../services/api';

export const SET_NAME = 'SET_NAME';
export const SET_TOKEN = 'SET_TOKEN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';

export const loginAction = (payload) => ({
  type: SET_NAME,
  payload,
});

export const apiTokenRequest = () => ({
  type: REQUEST_TOKEN,
});

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  dispatch(apiTokenRequest());
  const url = 'https://opentdb.com/api_token.php?command=request';
  const { token } = await fetchApi(url);
  localStorage.setItem('token', token);
  dispatch(setToken(token));
};
