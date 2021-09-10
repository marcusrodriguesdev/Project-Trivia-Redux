export default function setInitialState() {
  const playerObj = {
    player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    },
  };
  localStorage.setItem('state', JSON.stringify(playerObj));
}
