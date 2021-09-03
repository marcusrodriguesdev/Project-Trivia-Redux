export const SET_PLAYER = 'SET_PLAYER';
export const SET_GAME_ROUND = 'SET_GAME_ROUND';
export const SET_CONFIG = 'SET_CONFIG';

export const setPlayer = (payload) => ({
  type: SET_PLAYER,
  payload,
});

export const setGameRound = (payload) => ({
  type: SET_GAME_ROUND,
  payload,
});

export const setConfig = (payload) => ({
  type: SET_CONFIG,
  payload,
});
