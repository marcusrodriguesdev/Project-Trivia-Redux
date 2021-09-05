const fetchTriviaAPI = async (token) => {
  const triviaURL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(triviaURL);
  const data = await response.json();
  return data.results;
};

export default fetchTriviaAPI;
