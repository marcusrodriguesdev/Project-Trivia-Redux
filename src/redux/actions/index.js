export const ACTIONS = {
  GET_TOKEN: 'GET_TOKEN',
  SCORE: 'SCORE',
  HITS: 'HITS',
};

export const getToken = (token) => ({
  type: ACTIONS.GET_TOKEN, token,
});

export const getImage = (image) => ({
  type: 'IMAGE', image,
});

export const getNameAndEmail = (name, email) => ({
  type: 'NAME_EMAIL',
  name,
  email,
});

export const getScore = (score) => ({
  type: ACTIONS.SCORE, score,
});

export const getHits = (hits) => ({
  type: ACTIONS.HITS, hits,
});

export const getTimer = (timer) => ({
  type: 'TIMER', timer,
});

export const changeStop = () => ({
  type: 'STOP',
});

// export default (ACTIONS, getToken, getNameAndEmail);
