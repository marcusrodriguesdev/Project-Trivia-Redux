export const SAVE_NAME = 'SAVE_NAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const saveName = (payload) => ({
  type: SAVE_NAME,
  payload,
});

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  payload: {
    questions,
  },
});

export const saveToken = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});
