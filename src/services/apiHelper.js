export const fetchPlayerToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((token) => token.token);
  return request;
};

export const fetchPlayerImg = async (hash) => {
  const request = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return request;
};

export const fetchQuestions = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((questions) => questions.results);
  return request;
};
