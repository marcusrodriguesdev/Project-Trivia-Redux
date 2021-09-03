import { fetchToken } from '../../services/fetchAPI';

export const GET_TOKEN = 'GET_TOKEN';
export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  const payload = await fetchToken();
  dispatch(getToken(payload));
};

export const setName = (payload) => ({
  type: SET_NAME,
  payload,
});

export const setEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});
