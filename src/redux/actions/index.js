import { fetchTriviaToken } from '../../services/API';

// Types

export const SET_DATA_USER = 'CLICK_BUTTON_LOGIN';

export const SET_TIMER = 'SET_TIMER';

export const SET_TOKEN = 'SET_TOKEN';

export const RESET_TIMER = 'RESET_TIMER';

export const SET_SCORE = 'SET_SCORE';

export const SET_CORRECT_ANSWER = 'SET_CORRECT_ANSWER';

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

export const resetTimer = (payload) => ({ type: RESET_TIMER, payload });

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload,
});

export const setCorrectAnswer = (payload) => ({ type: SET_CORRECT_ANSWER, payload });

// Thunk

export const fetchToken = () => async (dispatch) => {
  const token = await fetchTriviaToken();
  localStorage.setItem('token', JSON.stringify(token));
  dispatch(setGame(token));
};

export const setDataUser = (payload) => (dispatch) => {
  const { user, email } = payload;
  const local = JSON.parse(localStorage.getItem('state'));
  const localRanking = JSON.parse(localStorage.getItem('ranking'));
  const newLocal = { player: { ...local.player, name: user, gravatarEmail: email } };
  const newLocalRanking = [...localRanking, { name: user, score: 0, picture: email }];
  localStorage.setItem('state', JSON.stringify(newLocal));
  localStorage.setItem('ranking', JSON.stringify(newLocalRanking));
  dispatch(setData(payload));
};
