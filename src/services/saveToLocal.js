import loadLocal from './getLocal';

const NEGATIVE_NUMBER = -1;

export default function save(name, image, score) {
  const state = loadLocal();
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
