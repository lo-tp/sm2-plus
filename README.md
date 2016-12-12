### sm2-plus
----

This is a JS implementation of an refined version of SM2 algorithm invented by [**BlueRaja**][br] overcoming some of the inherent issues of the original version.
Details about what these issuses are and how [**BlueRaja**][br] solved them can be found in this [post][original].

#### Installation
```
$ npm install sm2-plus --save
```

#### Usage
```javascript
import { WORST, BEST, calculate, getPercentOverdue } from 'sm2-plus';

const DAY_IN_MINISECONDS = 24 * 60 * 60 * 1000;
const getDaysSinceEpoch = () => (
    Math.round(new Date().getTime() / DAY_IN_MINISECONDS)
);

const TODAY = getDaysSinceEpoch();

const testWord = {
  word: 'test',
  update: TODAY - 17,    
  difficulty: 0.2,
  interval: 100,
};

console.info(calculate(testWord, BEST, TODAY));
```
The output should be:
``` javascript
{ 
  difficulty: 0.19,    
  interval: 1,
  dueDate: TODAY+1,
  update: TODAY,
  word: 'test' 
  }
```
Among them `dueDate` is the date the next time when the item should be reviewed.

#### Algorithm Abstract

Each item should be stored as the following structure:
- difficulty:
   How difficult the item is, from [0.0, 1.0].  Defaults to 0.3 (if the software has no way of determining a better default for an item).
- interval: 
  How many days should occur between review attempts for this item.
- update:
  The last date this item was reviewed.

When reviewing item,  choose a performanceRating from [0.0, 1.0], with 1.0 being the best.  Set a cutoff point for the answer being “correct” (default is 0.6). Then the item data can be updated using the way described below:
- percentOverdue= (today - update) / interval) (2 <= percentOverdue)

- difficulty = difficulty + percentOverdue * (8 - 9 * performanceRating) / 17 (0 <= difficulty <= 1)

- difficultyWeight = 3 - 1.7 * difficulty

- interval =
  - 1 + (difficultyWeight - 1) * percentOverdue (for correct answer)
  - 1 / difficultyWeight / difficultyWeight (for incorrect answer)


[original]:http://www.blueraja.com/blog/477/a-better-spaced-repetition-learning-algorithm-sm2
[br]:http://www.blueraja.com/blog/author/blueraja
