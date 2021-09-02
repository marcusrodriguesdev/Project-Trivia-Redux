const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_TRIVIA: 'SET_TRIVIA',
};

export const setUser = (payload) => ({
  type: ACTIONS.SET_USER,
  payload,
});

export const setTrivia = (payload) => ({
  type: ACTIONS.SET_TRIVIA,
  payload,
});

export default ACTIONS;
