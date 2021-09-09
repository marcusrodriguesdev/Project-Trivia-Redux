export default function localHelper({ name, score, profile }) {
  const ranking = localStorage.getItem('ranking');
  if (!ranking) {
    const obj = {
      name,
      score,
      picture: profile,
    };
    localStorage.setItem('ranking', JSON.stringify([obj]));
  } else {
    const rankingObj = JSON.parse(ranking);
    const obj = {
      name,
      score,
      picture: profile,
    };
    rankingObj.push(obj);
    localStorage.setItem('ranking', JSON.stringify(rankingObj));
  }
}
