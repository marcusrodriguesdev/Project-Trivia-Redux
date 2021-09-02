const fecthApiToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    return data.token;
  } catch (error) {
    return error;
  }
};

export default fecthApiToken;
