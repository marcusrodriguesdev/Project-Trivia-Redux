export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const saveToken = (token) => ({
  type: TOKEN,
  token,
});

export const getToken = () => async (dispatch) => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const objResponse = await response.json();
  localStorage.setItem('token', objResponse.token);
  dispatch(saveToken(objResponse));
};

export const getQuestions = (token) => async (dispatch) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const objResponse = await response.json();
  return dispatch(saveQuestions(objResponse));
};

export const saveName = (name) => ({
  type: SAVE_NAME,
  player: {
    name,
  },
});
