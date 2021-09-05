const generateRandomAnswer = (correctAnswer, wrongAnswer) => {
  const answersArray = [correctAnswer, ...wrongAnswer];
  for (let index = answersArray.length - 1; index > 0; index -= 1) {
    const secondIndex = Math.floor(Math.random() * (index + 1));
    const tempNumber = answersArray[index];
    answersArray[index] = answersArray[secondIndex];
    answersArray[secondIndex] = tempNumber;
  }
  // const correct = randomAnswerArray.find((text) => text === correctAnswer);
  return answersArray;
};

export default generateRandomAnswer;
