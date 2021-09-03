import { fetchToken, fetchQuestion } from '../../services/fetchAPI';

export const GET_TOKEN = 'GET_TOKEN';
export const SET_QUESTION = 'SET_QUESTION';
export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';

export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const setQuestion = (payload) => ({
  type: SET_QUESTION,
  payload,
});

export const getTokenThunk = () => async (dispatch) => {
  const payload = await fetchToken();
  dispatch(getToken(payload));
};

export const getQuestionThunk = (token) => async (dispatch) => {
  const payload = await fetchQuestion(token);
  dispatch(setQuestion(payload));
};

export const setName = (payload) => ({
  type: SET_NAME,
  payload,
});

export const setEmail = (payload) => ({
  type: SET_EMAIL,
  payload,
});
