import { fetchTriviaToken } from '../../services/API';

export const SET_DATA_USER = 'CLICK_BUTTON_LOGIN';

export const SET_TOKEN = 'SET_TOKEN';

export const setDataUser = (payload) => ({
  type: SET_DATA_USER,
  payload,
});

export const setGame = (payload) => ({
  type: SET_TOKEN,
  payload,
});

export const fetchToken = () => async (dispatch) => {
  const token = await fetchTriviaToken();
  localStorage.setItem('token', JSON.stringify(token));
  dispatch(setGame(token));
};
