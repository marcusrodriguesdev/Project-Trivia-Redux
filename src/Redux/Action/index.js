import fetchTriviaAPI from '../../services/fetchTriviaAPI';
import generateRandomAnswer from '../../helpers/generateRandomAnswer';
import { getPlayerDataFromLocalStorage } from '../../helpers/localStorage';
import fetchUrlGravatarAPI from '../../services/fetchUrlGravatarAPI';

const ADD_NAME = 'ADD_NAME';
const ADD_EMAIL = 'ADD_EMAIL';
const SAVE_TOKEN = 'SAVE_TOKEN';
const ADD_URLGRAVATAR = 'ADD_URLGRAVATAR';
const REQUEST_GRAVATAR_SUCCESS = 'REQUEST_GRAVATAR_SUCCESS';
const RESQUEST_QUESTION_SUCESS = 'RESQUEST_QUESTION_SUCESS';
const LOADING = 'LOADING';
const SET_IS_CLICKED = 'SET_IS_CLICKED';
const GET_SECONDS = 'GET_SECONDS';
const CHANGE_VISIBILITY = 'CHANGE_VISIBILITY';
const UPDATE_SCORE = 'UPDATE_SCORE';
const TOGGLE_CRONOMETER = 'TOGGLE_CRONOMETER';
const COUNT_ASSERTIONS = 'COUNT_ASSERTIONS';
const RESET_SCORE = 'RESET_SCORE';

export const ALL_ACTIONS = {
  ADD_NAME,
  ADD_EMAIL,
  SAVE_TOKEN,
  ADD_URLGRAVATAR,
  REQUEST_GRAVATAR_SUCCESS,
  RESQUEST_QUESTION_SUCESS,
  LOADING,
  SET_IS_CLICKED,
  GET_SECONDS,
  CHANGE_VISIBILITY,
  UPDATE_SCORE,
  TOGGLE_CRONOMETER,
  COUNT_ASSERTIONS,
  RESET_SCORE,
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

export const addUrlGravatar = (urlGravatar) => ({
  type: ALL_ACTIONS.ADD_URLGRAVATAR,
  payload: urlGravatar,
});

export const loading = () => ({
  type: ALL_ACTIONS.LOADING,
  payload: false,
});

export const resetScore = () => ({
  type: ALL_ACTIONS.RESET_SCORE,
});

export const fetchAPIThunk = (token) => async (dispatch) => {
  dispatch(loading());
  const result = await fetchTriviaAPI(token);
  const difficultyLevel = { hard: 3, medium: 2, easy: 1 };
  const newQuestion = result.map((answer) => ({
    category: answer.category,
    type: answer.type,
    difficultyLevel: difficultyLevel[answer.difficulty],
    question: answer.question,
    correctAnswer: answer.correct_answer,
    answers: generateRandomAnswer(answer.correct_answer, answer.incorrect_answers),
  }));
  dispatch({
    type: ALL_ACTIONS.RESQUEST_QUESTION_SUCESS,
    payload: newQuestion,
  });
};

export const fetchUrlGravatar = (email) => async (dispatch) => {
  dispatch(loading());
  const url = await fetchUrlGravatarAPI(email);
  dispatch(addUrlGravatar(url));
};

export const setIsClicked = () => ({
  type: ALL_ACTIONS.SET_IS_CLICKED,
});

export const getSeconds = (seconds) => ({
  type: ALL_ACTIONS.GET_SECONDS,
  payload: seconds,
});

export const changeVisibility = () => ({
  type: ALL_ACTIONS.CHANGE_VISIBILITY,
});

export const updateScore = (score) => ({
  type: ALL_ACTIONS.UPDATE_SCORE,
  payload: score,
});

export const receiveScore = () => async (dispatch) => {
  const score = getPlayerDataFromLocalStorage('score');
  dispatch(updateScore(score));
};

export const toggleStatusCronometer = (status) => ({
  type: ALL_ACTIONS.TOGGLE_CRONOMETER,
  payload: status,
});

export const updateAssertions = (number) => ({
  type: ALL_ACTIONS.COUNT_ASSERTIONS,
  payload: number,
});
