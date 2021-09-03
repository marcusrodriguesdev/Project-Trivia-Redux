const fecthApiToken = async (token) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fecthApiToken;
