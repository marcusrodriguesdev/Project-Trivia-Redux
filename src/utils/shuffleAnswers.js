const pickRandomIndex = (max) => Math.floor(Math.random() * max);

const shuffleAnswers = (incorrectAnswers, correctAnswer) => {
  const answers = [...incorrectAnswers, correctAnswer];

  const selectedAnswers = {};
  const tempAnswers = [];

  for (let i = 0; i < answers.length; i += 1) {
    let randomIndex = pickRandomIndex(answers.length);

    while (selectedAnswers[randomIndex]) {
      randomIndex = pickRandomIndex(answers.length);
    }

    selectedAnswers[randomIndex] = true;

    const pickedAnswer = answers[randomIndex];

    tempAnswers.push({
      isCorrect: pickedAnswer === correctAnswer,
      text: decodeURIComponent(pickedAnswer),
    });
  }

  return tempAnswers;
};

export default shuffleAnswers;
