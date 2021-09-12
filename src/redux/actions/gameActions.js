const GAME_ACTIONS = {
  GUESS: 'GUESS',
  NEXT_QUESTION: 'NEXT_QUESTION',
  INCREASE_SCORE: 'INCREASE_SCORE',
  SET_TIME: 'SET_TIME',
  RESET_GAME: 'RESET_GAME',
  INCREASE_ASSERTIONS: 'INCREASE_ASSERTIONS',
};

export const guess = () => ({ type: GAME_ACTIONS.GUESS });

export const increaseScore = (amount) => ({
  type: GAME_ACTIONS.INCREASE_SCORE,
  payload: amount,
});

export const setTime = (time) => ({
  type: GAME_ACTIONS.SET_TIME,
  payload: time,
});

export const nextQuestion = () => ({ type: GAME_ACTIONS.NEXT_QUESTION });

export const resetGame = () => ({
  type: GAME_ACTIONS.RESET_GAME,
});

export const increaseAssertions = () => ({
  type: GAME_ACTIONS.INCREASE_ASSERTIONS,
});

export default GAME_ACTIONS;
