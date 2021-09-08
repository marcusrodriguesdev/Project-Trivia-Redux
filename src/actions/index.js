export const PLAYER_INFO = 'PLAYER_INFO';
export const PLAYER_POINTS = 'PLAYER_POINTS';

export const playerInfo = (payload) => ({
  type: PLAYER_INFO,
  payload,
});

export const playerPoints = (payload) => ({
  type: PLAYER_POINTS,
  payload,
});
