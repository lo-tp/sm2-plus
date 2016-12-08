'use strict';

var _chai = require('chai');

var _index = require('../distribution/index');

var DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
var getDaysSinceEpoch = function getDaysSinceEpoch() {
  return Math.round(new Date().getTime() / DAY_IN_MINISECONDS);
};

var TODAY = getDaysSinceEpoch();

var testData = [

// correct for interval
{
  word: 'test',
  update: TODAY,
  performanceRating: _index.BEST,
  difficulty: 0.2,
  nextDifficulty: 0.2,
  interval: 1,
  nextInterval: 1,
  nextUpdate: TODAY
}, {
  word: 'test',
  update: TODAY - 17,
  performanceRating: _index.BEST,
  difficulty: 0.2,
  nextDifficulty: 0.19,
  interval: 100,
  nextInterval: 1,
  nextUpdate: TODAY
}, {
  word: 'test',
  update: TODAY - 17,
  performanceRating: _index.BEST,
  difficulty: 0.2,
  nextDifficulty: 0.1,
  interval: 10,
  nextInterval: 4,
  nextUpdate: TODAY
},

// incorrect for interval
{
  word: 'test',
  update: TODAY - 17,
  performanceRating: _index.WORST,
  difficulty: 0.2,
  nextDifficulty: 1,
  interval: 10,
  nextInterval: 1,
  nextUpdate: TODAY
}];

var testDataForGetPercentOverdue = [{
  update: TODAY,
  interval: 1,
  percentOverDue: 0
}, {
  update: TODAY - 100,
  interval: 200,
  percentOverDue: 0.5
},

// percent overdue should never exceed 2
{
  update: TODAY - 100,
  interval: 1,
  percentOverDue: 2
}];

describe('percent overdue', function () {
  var today = TODAY;
  testDataForGetPercentOverdue.forEach(function (d, i) {
    it('Test Data ' + i, function () {
      _chai.assert.equal((0, _index.getPercentOverdue)(d, today), d.percentOverDue, 'Percent Overdue Is Not Right');
    });
  });
});

describe('calculate', function () {
  var today = TODAY;
  testData.forEach(function (d, i) {
    it('Test Data ' + i, function () {
      var calculated = (0, _index.calculate)(d, d.performanceRating, today);
      _chai.assert.closeTo(calculated.difficulty, d.nextDifficulty, 0.00000001, 'Difficulty Calculation Is Not Right');
      _chai.assert.equal(calculated.interval, d.nextInterval, 'Interval Calculation Is Not Right');
      _chai.assert.equal(calculated.dueDate, today + d.nextInterval, 'Due Date Calculation Is Not Right');
      _chai.assert.equal(calculated.update, d.nextUpdate, 'Update Calculation Is Not Right');
    });
  });
});