import fetchApi from '../services/api';

export const SET_PLAYER = 'SET_PLAYER';
export const SET_TOKEN = 'SET_TOKEN';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SET_SCORE_AND_ASSERTIONS = 'SET_SCORE_AND_ASSERTIONS';

export const loginAction = (payload) => ({
  type: SET_PLAYER,
  payload,
});

export const apiTokenRequest = () => ({
  type: REQUEST_TOKEN,
});

export const setToken = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const setScoreAndAssertions = (payload) => ({
  type: SET_SCORE_AND_ASSERTIONS,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  dispatch(apiTokenRequest());
  const url = 'https://opentdb.com/api_token.php?command=request';
  const { token } = await fetchApi(url);
  localStorage.setItem('token', token);
  dispatch(setToken(token));
};
