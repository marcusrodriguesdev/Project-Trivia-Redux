import { loadRanking, loadScore } from './getLocal';

const NEGATIVE_NUMBER = -1;

export function saveRank(name, picture, score) {
  const state = loadRanking();
  const id = state.length + 1;
  state.push({ id, name, picture, score });
  state.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    return NEGATIVE_NUMBER;
  });
  localStorage.setItem('ranking', JSON.stringify(state));
}

export function saveScore(score) {
  const state = loadScore();
  const result = state + score;
  localStorage.setItem('score', JSON.stringify(result));
}

export function resetScore() {
  localStorage.setItem('score', JSON.stringify(0));
}
