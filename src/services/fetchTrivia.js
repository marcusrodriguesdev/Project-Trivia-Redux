const fetchTrivia = async (url, token) => {
  let response = await fetch(`${url}${token}`);
  response = await response.json();
  return response.results;
};

export default fetchTrivia;
