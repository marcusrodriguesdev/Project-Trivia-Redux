import { fetchTriviaToken } from '../../services/API';

// Types

export const SET_DATA_USER = 'CLICK_BUTTON_LOGIN';

export const SET_TIMER = 'SET_TIMER';

export const SET_TOKEN = 'SET_TOKEN';

export const SET_SCORE = 'SET_SCORE';

// Actions

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

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload,
});

// Thunk

export const fetchToken = () => async (dispatch) => {
  const token = await fetchTriviaToken();
  localStorage.setItem('token', JSON.stringify(token));
  dispatch(setGame(token));
};

export const setDataUser = (payload) => (dispatch) => {
  const { user, email } = payload;
  const local = JSON.parse(localStorage.getItem('state'));
  const newLocal = { player: { ...local.player, name: user, gravatarEmail: email } };
  localStorage.setItem('state', JSON.stringify(newLocal));
  dispatch(setData(payload));
};
