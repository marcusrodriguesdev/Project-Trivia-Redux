export default function loadLocal() {
  const array = JSON.parse(localStorage.getItem('ranking'));
  if (array == null || array === '') return [];
  return array;
}
