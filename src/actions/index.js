import { MD5 } from 'crypto-js';

export const LOGIN = 'LOGIN';
export const LOADING = 'LOADING';
export const USER_LOGIN = 'USER_LOGIN';
export const ADD_TRIVIA = 'ADD_TRIVIA';
export const ADD_TOKEN = 'ADD_TOKEN';
export const FETCH_GRAVATAR = 'FETCH_GRAVATAR';
export const USER_TRY = 'USER_TRY';
export const SHOW_NEXT_BUTTON = 'SHOW_NEXT_BUTTON';
export const ADD_TRIVIA_INDEX = 'ADD_TRIVIA_INDEX';

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

export const userLogin = ({ name, email }) => ({
  type: LOGIN,
  payload: { name, email },
});

export const fetchGravatar = (payload) => ({
  type: FETCH_GRAVATAR,
  payload,
});

export const addTriviaIndex = (payload) => ({
  type: ADD_TRIVIA_INDEX,
  payload,
});

export const userTry = (payload) => ({
  type: USER_TRY,
  payload,
});

export const showNextButton = () => ({
  type: SHOW_NEXT_BUTTON,
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

export const requestGravatarThunk = (email) => (dispatch) => {
  const userEmail = MD5(email).toString();
  const page = `https://www.gravatar.com/avatar/${userEmail}`;
  console.log(page);
  dispatch(fetchGravatar(page));
};
