export const setPlayerInLocalStorage = () => {
  const INITIAL_STATE = {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  };
  localStorage.setItem('state', JSON.stringify({ player: INITIAL_STATE }));
};

export const setRankingLocalStorage = (name, score, urlGravatar) => {
  const ranking = [
    { name, score, picture: urlGravatar },
  ];

  if (localStorage.getItem('ranking')) {
    const oldRanking = JSON.parse(localStorage.getItem('ranking'));
    const newRanking = [...oldRanking, { name, score, picture: urlGravatar }];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
    return newRanking;
  }
  localStorage.setItem('ranking', JSON.stringify(ranking));
};

export const saveToLocalStorage = (data, string) => {
  localStorage.setItem(string, JSON.stringify(data));
};

export const updateAssertionsAndScore = (difficulty, seconds) => {
  const TEN = 10;
  const state = JSON.parse(localStorage.getItem('state'));
  const updatedPlayer = {
    ...state.player,
    score: Number(state.player.score) + (Number(TEN + (difficulty * seconds))),
    assertions: Number(state.player.assertions) + 1,
  };
  localStorage.setItem('state', JSON.stringify({ player: updatedPlayer }));
};

export const getPlayerDataFromLocalStorage = (property) => {
  const state = JSON.parse(localStorage.getItem('state'));
  return state.player[property];
};

export const getRankingDataFromLocalStorage = () => {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  return ranking.sort((a, b) => b.score - a.score);
};
