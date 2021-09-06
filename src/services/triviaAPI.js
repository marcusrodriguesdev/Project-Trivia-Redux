const BASE_API = 'https://opentdb.com';

// https://opentdb.com/api_token.php?command=request
// https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

export const getTokenTrivia = () => (
  fetch(`${BASE_API}/api_token.php?command=request`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const getGameTrivia = (token) => (
  fetch(`${BASE_API}/api.php?amount=5&token=${token}`)
    .then((responseGame) => (
      responseGame
        .json()
        .then((json) => (responseGame.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
