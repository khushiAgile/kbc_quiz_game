export const getRandomQuiz = (arr: any) => {
  // Generate random index within the array size
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const getLifelineAns = (options, answer) => {
  const correctIndex = options.findIndex((value) => value === answer);

  const correctAnswer = options[correctIndex];

  const otherOption = options.filter(
    (option, index) => index !== correctIndex,
  )[0];

  return [otherOption, correctAnswer];
};

export const setPriseMoney = (currentLevel, currentPrizeMoney) => {
  let prizeMoney = currentPrizeMoney;
  const prizeMoneyObj = {
    4: 1000,
    7: 1000000,
    9: 100000000,
  };

  prizeMoney = prizeMoneyObj[currentLevel] ?? prizeMoney;
  return prizeMoney;
};
