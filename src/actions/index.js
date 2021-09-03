export const SET_PLAYER_INFO = 'SET_PLAYER_INFO';
export const SET_QUESTIONS = 'SET_QUESTIONS';

export const setPlayerInfo = (payload) => ({ type: SET_PLAYER_INFO, payload });
export const setPlayerQuestions = (payload) => ({ type: SET_QUESTIONS, payload });
