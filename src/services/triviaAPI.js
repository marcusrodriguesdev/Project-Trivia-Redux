const BASE_API = 'https://opentdb.com';

// https://opentdb.com/api_token.php?command=request
// https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

const getTokenTrivia = () => (
  fetch(`${BASE_API}/api_token.php?command=request`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getTokenTrivia;
