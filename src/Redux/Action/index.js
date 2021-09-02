const ADD_EMAIL = 'ADD_EMAIL';

export const ALL_ACTIONS = {
  ADD_EMAIL,
};

export const addEmail = (email) => ({
  type: ALL_ACTIONS.ADD_EMAIL,
  payload: email,
});
