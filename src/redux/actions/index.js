export const SET_PLAYER = 'SET_PLAYER';
export const ADD_SCORE = 'ADD_SCORE';
export const RESET_SCORE = 'RESET_SCORE';
export const SET_GAME_ROUND = 'SET_GAME_ROUND';
export const SET_GAME_TOKEN = 'SET_GAME_TOKEN';
export const SET_CONFIG = 'SET_CONFIG';

export const setPlayer = (payload) => ({
  type: SET_PLAYER,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const resetScore = (payload) => ({
  type: RESET_SCORE,
  payload,
});

export const setGameRound = (payload) => ({
  type: SET_GAME_ROUND,
  payload,
});

export const setGameToken = (payload) => ({
  type: SET_GAME_TOKEN,
  payload,
});

export const setConfig = (payload) => ({
  type: SET_CONFIG,
  payload,
});
