import { fetchToken } from '../Services/api';

const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_TRIVIA: 'SET_TRIVIA',
  // GET_TOKEN: 'GET_TOKEN',
  GET_TOKEN_SUCCESS: 'GET_TOKEN_SUCCESS',
  GET_TOKEN_ERROR: 'GET_TOKEN_ERROR',
};

export const setUser = (payload) => ({
  type: ACTIONS.SET_USER,
  payload,
});

export const setTrivia = (payload) => ({
  type: ACTIONS.SET_TRIVIA,
  payload,
});

// Implementação da action de Loading
// export const getToken = () => ({
//   type: ACTIONS.GET_TOKEN,
// });

export const getTokenSuccess = (payload) => ({
  type: ACTIONS.GET_TOKEN_SUCCESS, payload,
});

export const getTokenApi = () => async (dispatch) => {
  // dispatch(getToken());

  const response = await fetchToken();

  dispatch(getTokenSuccess(response.token));
};

export default ACTIONS;
