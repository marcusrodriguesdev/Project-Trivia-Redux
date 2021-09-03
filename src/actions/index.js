export const LOGIN = 'LOGIN';
export const LOADING = 'LOADING';
export const USER_LOGIN = 'USER_LOGIN';
export const ADD_TRIVIA = 'ADD_TRIVIA';
export const ADD_TOKEN = 'ADD_TOKEN';

export const loading = () => ({
  type: LOADING,
});

export const addTrivia = (payload) => ({
  type: ADD_TRIVIA,
  payload,
});

export const addToken = (payload) => ({
  type: ADD_TOKEN,
  payload,
});

export const userLogin = (email) => ({
  type: LOGIN,
  user: {
    email,
  },
});

export const requestTokenThunk = () => async (dispatch) => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  dispatch(loading());
  const response = await fetch(url);
  const tokenGenerated = await response.json();
  const { token } = tokenGenerated;
  dispatch(addToken(token));
};

export const addTriviaThunk = () => async (dispatch) => {
  const url = 'https://opentdb.com/api.php?amount=5';
  dispatch(loading());
  const response = await fetch(url);
  const triviaGame = await response.json();
  const { results } = triviaGame;
  dispatch(addTrivia(results));
};
