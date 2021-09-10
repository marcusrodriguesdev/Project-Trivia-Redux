export default function setInitialState() {
  const playerObj = {
    player: {
      name: '',
      assertions: '',
      score: 0,
      gravatarEmail: '',
    },
  };
  localStorage.setItem('state', JSON.stringify(playerObj));
}
