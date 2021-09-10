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

export const fetchQuestions = async (token, settings) => {
  const settingsKeys = Object.keys(settings);
  let apiCall = 'https://opentdb.com/api.php?amount=5&encode=url3986';
  settingsKeys.forEach((setting, index) => {
    if (settings[setting] !== 'All') {
      apiCall += `&${settingsKeys[index]}=${settings[setting]}`;
    }
  });
  const request = await fetch(`${apiCall}&${token}`)
    .then((response) => response.json())
    .then((questions) => questions.results);
  return request;
};

export const fetchCategories = async () => {
  const request = await fetch('https://opentdb.com/api_category.php')
    .then((response) => response.json());
  return request;
};
