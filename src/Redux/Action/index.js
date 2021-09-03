const ADD_NAME = 'ADD_NAME';
const ADD_EMAIL = 'ADD_EMAIL';
const SAVE_TOKEN = 'SAVE_TOKEN';
const RESQUEST_QUESTION_SUCESS = 'RESQUEST_QUESTION_SUCESS';
const LOADING = 'LOADING';

export const ALL_ACTIONS = {
  ADD_NAME,
  ADD_EMAIL,
  SAVE_TOKEN,
  RESQUEST_QUESTION_SUCESS,
  LOADING,
};

export const addName = (name) => ({
  type: ALL_ACTIONS.ADD_NAME,
  payload: name,
});

export const addEmail = (email) => ({
  type: ALL_ACTIONS.ADD_EMAIL,
  payload: email,
});

export const saveToken = (token) => ({
  type: ALL_ACTIONS.SAVE_TOKEN,
  payload: token,
});

export const loading = () => ({
  type: ALL_ACTIONS.LOADING,
});

export const fetchAPIThunk = (token) => async (dispatch) => {
  dispatch(loading());
  try {
    const triviaURL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await (await fetch(triviaURL)).json();
    dispatch({
      type: ALL_ACTIONS.RESQUEST_QUESTION_SUCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};
