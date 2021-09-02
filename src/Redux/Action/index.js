const ADD_EMAIL = 'ADD_EMAIL';
const SAVE_TOKEN = 'SAVE_TOKEN';

export const ALL_ACTIONS = {
  ADD_EMAIL,
  SAVE_TOKEN,
};

export const addEmail = (email) => ({
  type: ALL_ACTIONS.ADD_EMAIL,
  payload: email,
});

export const saveToken = (token) => ({
  type: ALL_ACTIONS.SAVE_TOKEN,
  payload: token,
});
