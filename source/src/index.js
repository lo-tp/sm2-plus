const WORST = 0;
const CORRECT = 0.6;
const BEST = 1;

const limitNumber = (number, min, max) => {
  let ret = number;
  if (number < min) {
    ret = min;
  } else if (number > max) {
    ret = max;
  }

  return ret;
};

const getPercentOverdue = (word, today) => {
  const calculated = (today - word.update) / word.interval;
  return calculated > 2 ? 2 : calculated;
};

const calculate = ( word, performanceRating, today ) => {
  const percentOverDue = getPercentOverdue(word, today);
  console.info(today, performanceRating);
  console.info(percentOverDue);

  const difficulty = limitNumber(
    word.difficulty + (8 - 9 * performanceRating) * percentOverDue / 17,
                                 0, 1);
  const difficultyWeight = 3 - 1.7 * difficulty;
  let interval;
  if (performanceRating === WORST) {
    interval = Math.round(1 / difficultyWeight / difficultyWeight) || 1;
  } else {
    interval = 1 + Math.round((difficultyWeight - 1) * percentOverDue);
  }

  return {
    difficulty,
    interval,
    dueDate: today + interval,
    update: today,
    word: word.word,
  };
};

module.exports = {
  calculate,
  getPercentOverdue,
  WORST,
  CORRECT,
  BEST,
};
