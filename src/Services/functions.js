export default function getDifficulty(difficulty) {
  const hard = 3;
  switch (difficulty) {
  case 'easy':
    return 1;
  case 'medium':
    return 2;
  case 'hard':
    return hard;
  default:
    return 0;
  }
}
