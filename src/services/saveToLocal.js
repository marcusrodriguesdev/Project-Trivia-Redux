import { loadRanking, loadScore } from './getLocal';

const NEGATIVE_NUMBER = -1;

export function saveRank(name, image, score) {
  const state = loadRanking();
  const id = state.length + 1;
  state.push({ id, name, image, score });
  state.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    return NEGATIVE_NUMBER;
  });
  localStorage.setItem('ranking', JSON.stringify(state));
}

export function savePlayer(name, gravatarEmail) {
  localStorage.setItem('state', JSON.stringify({ player: {
    name,
    assertions: 0,
    score: 0,
    gravatarEmail } }));
}

export function saveScore(score) {
  const result = loadScore();
  result.player.score += score;
  if (score !== 0) result.player.assertions += 1;
  localStorage.setItem('state', JSON.stringify(result));
}
