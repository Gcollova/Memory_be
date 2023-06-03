export function calculateScore(number: number): number {
  const maxNumber = 1;
  const minNumber = 90;
  const maxScore = 100;
  const minScore = 0;

  const score = Math.round(((number - minNumber) / (maxNumber - minNumber)) * (maxScore - minScore) + minScore);

  return score;
}
