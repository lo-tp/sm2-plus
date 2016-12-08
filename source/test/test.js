import { assert } from 'chai';
import { WORST, BEST, calculate, getPercentOverdue } from '../distribution/index';

const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
const getDaysSinceEpoch = () => (
    Math.round(new Date().getTime() / DAY_IN_MINISECONDS)
);

const TODAY = getDaysSinceEpoch();
const testData = [

  // correct for interval
  {
    word: 'test',
    update: TODAY,
    performanceRating: BEST,
    difficulty: 0.2,
    nextDifficulty: 0.2,
    interval: 1,
    nextInterval: 1,
    nextUpdate: TODAY,
  },
  {
    word: 'test',
    update: TODAY - 17,
    performanceRating: BEST,
    difficulty: 0.2,
    nextDifficulty: 0.19,
    interval: 100,
    nextInterval: 1,
    nextUpdate: TODAY,
  },
  {
    word: 'test',
    update: TODAY - 17,
    performanceRating: BEST,
    difficulty: 0.2,
    nextDifficulty: 0.1,
    interval: 10,
    nextInterval: 4,
    nextUpdate: TODAY,
  },

  // incorrect for interval
  {
    word: 'test',
    update: TODAY - 17,
    performanceRating: WORST,
    difficulty: 0.2,
    nextDifficulty: 1,
    interval: 10,
    nextInterval: 1,
    nextUpdate: TODAY,
  },
];

const testDataForGetPercentOverdue = [
  {
    update: TODAY,
    interval: 1,
    percentOverDue: 0,
  },
  {
    update: TODAY - 100,
    interval: 200,
    percentOverDue: 0.5,
  },

  // percent overdue should never exceed 2
  {
    update: TODAY - 100,
    interval: 1,
    percentOverDue: 2,
  },
];

describe('percent overdue', () => {
  const today = TODAY;
  testDataForGetPercentOverdue.forEach((d, i) => {
    it(`Test Data ${i}`, () => {
      assert.equal(getPercentOverdue(d, today), d.percentOverDue, 'Percent Overdue Is Not Right');
    });
  });
});

describe('calculate', () => {
  const today = TODAY;
  testData.forEach((d, i) => {
    it(`Test Data ${i}`, () => {
      const calculated = calculate(d, d.performanceRating, today);
      assert.closeTo(calculated.difficulty, d.nextDifficulty, 0.00000001, 'Difficulty Calculation Is Not Right');
      assert.equal(calculated.interval, d.nextInterval, 'Interval Calculation Is Not Right');
      assert.equal(calculated.dueDate, today + d.nextInterval, 'Due Date Calculation Is Not Right');
      assert.equal(calculated.update, d.nextUpdate, 'Update Calculation Is Not Right');
    });
  });
});
