// Arquivos onde serão colocadas todas as actions.
export const PLAY = 'PLAY';

const playAction = (payload) => ({
  type: PLAY,
  payload,
});

export default playAction;
