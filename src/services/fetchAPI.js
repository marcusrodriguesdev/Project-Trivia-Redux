export const fetchToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  await localStorage.setItem('token', JSON.stringify(data.token));
  return data.token;
};

export const fetchQuestion = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await response.json();
  return data.results;
};
