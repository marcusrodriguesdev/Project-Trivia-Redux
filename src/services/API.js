async function fetchTriviaToken() {
  const re = fetch('https://opentdb.com/api_token.php?command=request');
  if(re.response_code === 0) {
    return re.json();
  }
}

async function fetchTriviaQuestions(token) {
  const re = fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
}