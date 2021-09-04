export const setPlayerInLocalStorage = () => {
  const INITIAL_STATE = {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
  };
  localStorage.setItem('state', JSON.stringify({ player: INITIAL_STATE }));
};

export const saveToLocalStorage = (data, string) => {
  localStorage.setItem(string, JSON.stringify(data));
};

export const updateAssertionsAndScore = (difficulty, seconds) => {
  const TEN = 10;
  const state = JSON.parse(localStorage.getItem('state'));
  const updatedPlayer = {
    ...state.player,
    score: Number(state.player.score) + (TEN + (difficulty * seconds)),
    assertions: Number(state.player.assertions) + 1,
  };
  localStorage.setItem('state', JSON.stringify({ player: updatedPlayer }));
};

export const getPlayerDataFromLocalStorage = (property) => {
  const state = JSON.parse(localStorage.getItem('state'));
  return state.player[property];
};
