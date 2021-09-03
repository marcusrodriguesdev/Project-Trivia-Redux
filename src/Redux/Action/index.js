// Arquivos onde serão colocadas todas as actions.
// md5(emailDoUsuário).toString()
export const PLAY = 'PLAY';

const playAction = (payload) => ({
  type: PLAY,
  payload,
});

export default playAction;
