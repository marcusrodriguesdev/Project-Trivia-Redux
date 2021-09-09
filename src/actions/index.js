export const LOGIN = 'LOGIN';
export const TOKEN = 'TOKEN';
export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';

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
  const objToken = await response.json();
  dispatch(saveToken(objToken)); // https://opentdb.com/api.php?amount=5&encode=url3986&token=${objToken.token}
  localStorage.setItem('token', objToken.token);
  const response2 = await fetch(`https://opentdb.com/api.php?amount=5&encode=base64&token=${objToken.token}`);
  const objQuestions = await response2.json();
  dispatch(saveQuestions(objQuestions));
};

export const saveName = (name) => ({
  type: SAVE_NAME,
  player: {
    name,
  },
});

export const updateScore = (points) => ({
  type: UPDATE_SCORE,
  points,
});
