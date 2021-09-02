import { fetchToken } from '../../services/fetchAPI';

export const GET_TOKEN = 'GET_TOKEN';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  const payload = await fetchToken();
  dispatch(getToken(payload));
};
