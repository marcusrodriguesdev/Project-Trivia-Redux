const GAME_ACTIONS = {
  GUESS: 'GUESS',
  NEXT_QUESTION: 'NEXT_QUESTION',
};

export const guess = () => ({ type: GAME_ACTIONS.GUESS });

export const nextQuestion = () => ({ type: GAME_ACTIONS.NEXT_QUESTION });

export default GAME_ACTIONS;
