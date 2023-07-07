export const getScore = (scoreValue: string, lowerLimit = 0, upperLimit = 99): number => {
  const score = parseInt(scoreValue, 10) || lowerLimit
  return score < lowerLimit ? lowerLimit : score > upperLimit ? upperLimit : score
}
