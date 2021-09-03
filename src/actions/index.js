<<<<<<< HEAD
export const LOGIN = 'LOGIN';

const userLogin = (email) => ({
  type: LOGIN,
  user: {
    email,
  },
});

export default userLogin;
=======
export const LOADING = 'LOADING';
export const USER_LOGIN = 'USER_LOGIN';
export const ADD_TRIVIA = 'ADD_TRIVIA';

export const loading = () => ({
  type: LOADING,
})

export const addTrivia = (payload) => ({
  type: ADD_TRIVIA,
  payload,
})

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
})


export const addTriviaThunk = () => async (dispatch) => {
  const url = 'https://opentdb.com/api.php?amount=5'
  dispatch(loading());
  const response = await fetch(url);
  const triviaGame = await response.json();
  const { results } = triviaGame;
  console.log(results);
  dispatch(addTrivia(results));
};
>>>>>>> 4f05f571bd16486b15fbe8635cb137d748772f3e
