import { fetchTriviaToken } from '../../services/API';

export const SET_DATA_USER = 'CLICK_BUTTON_LOGIN';

export const SET_TIMER = 'SET_TIMER';

export const SET_TOKEN = 'SET_TOKEN';

export const setData = (payload) => ({
  type: SET_DATA_USER,
  payload,
});

export const setTimer = (payload) => ({
  type: SET_TIMER,
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

export const setDataUser = (payload) => (dispatch) => {
  const { user, email } = payload;
  const local = JSON.parse(localStorage.getItem('state'));
  const newLocal = { ...local, name: user, email };
  localStorage.setItem('state', JSON.stringify(newLocal));
  dispatch(setData(payload));
};
