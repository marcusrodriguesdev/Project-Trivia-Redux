export const setRanking = (name, score, urlGravatar) => {
  const ranking = [
    {
      name,
      score,
      picture: urlGravatar,
    },
  ];

  if (localStorage.getItem('ranking')) {
    const lastRanking = JSON.parse(localStorage.getItem('ranking'));
    const newRanking = [...lastRanking, { name, score, picture: urlGravatar }];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
    return newRanking;
  }

  localStorage.setItem('ranking', JSON.stringify(ranking));
};

export const getRanking = () => {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  return ranking.sort((a, b) => b.score - a.score);
};
