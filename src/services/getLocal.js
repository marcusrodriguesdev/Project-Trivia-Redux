export function loadRanking() {
  const array = JSON.parse(localStorage.getItem('ranking'));
  if (array == null || array === '') return [];
  return array;
}

export function loadScore() {
  const result = JSON.parse(localStorage.getItem('score'));
  if (result == null || result === '') return 0;
  return result;
}
