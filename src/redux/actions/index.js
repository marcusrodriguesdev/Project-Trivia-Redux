import fetchToken from '../../services/tokenAPI';
// import fetchTrivia from '../../services/triviaAPI';

export const REQUEST_TOKEN_SUCCESS = 'REQUEST_TOKEN_SUCCESS';
export const REQUEST_TOKEN_ERROR = 'REQUEST_TOKEN_ERROR';
export const LOGIN = 'LOGIN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_SUCCESS = 'REQUEST_QUESTIONS_SUCCESS';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

const requestTokenSuccess = (payload) => ({
  type: REQUEST_TOKEN_SUCCESS,
  payload,
});

const requestTokenError = (payload) => ({
  type: REQUEST_TOKEN_ERROR,
  payload,
});

// const requestTrivia = () => ({
//   type: REQUEST_QUESTIONS,
// });

const requestTriviaSuccess = (payload) => ({
  type: REQUEST_QUESTIONS_SUCCESS,
  payload,
});

const requestTriviaError = (payload) => ({
  type: REQUEST_QUESTIONS_ERROR,
  payload,
});

export const requestTokenThunk = () => async (dispatch) => {
  try {
    const response = await fetchToken();
    return dispatch(requestTokenSuccess(response));
  } catch (error) {
    dispatch(requestTokenError(error));
  }
};

// export function requestQuestionsThunk(token) {
//   return (dispatch) => { // thunk declarado
//     dispatch(requestTrivia());
//     return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
//       .then((response) => response.json())
//       .then((questions) => dispatch(requestTriviaSuccess(questions)));
//   };
// }

export const requestQuestionsThunk = (token) => async (dispatch) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    console.log(data);
    return dispatch(requestTriviaSuccess(data));
  } catch (error) {
    dispatch(requestTriviaError(error));
  }
};
