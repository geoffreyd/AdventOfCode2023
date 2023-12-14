import { parseInput } from './shared.js';
import _ from "lodash-es";
import part1 from './part1.js';

const part2 = (rawInput) => {
  // return
  const input = parseInput(rawInput);

  var data = input.slice().map(row => {
    // return row;
    const s5 = _.times(5).map(() => row.springs.join('')).join('?')
    const c5 = _.times(5).flatMap(() => row.counts)
    return {
      springs: s5,
      counts: c5
    }
  });

  const counts = data.map(line => {
    console.log("line", line.springs, line.counts);
    return countWays(line.springs, line.counts)
  });
  return _.sum(counts)
};

export default part2;

const _countWays = (springs, counts) => {
  console.log('>', springs, counts.join(','));
  if (springs.length === 0) {
    if (counts.length === 0) {
      return 1;
    }
    return 0;
  }

  // if we've hit the end of broken counts,
  // make sure the rest are working
  if (counts.length === 0) {
    for (let i = 0; i < springs.length; i++) {
      if (springs[i] === "#") {
        // found a broken one, this can't work.
        return 0;
      }
    }
    return 1;
  }

  // check if the line has at least enough to finish
  if (springs.length < _.sum(counts) + counts.length - 1) {
    return 0;
  }

  // head is a working spring, move on
  if (springs[0] === ".") {
    return countWays(springs.slice(1), counts);
  }

  // head is broken. check that there are enough broken ones following
  // to fill this count.
  if (springs[0] === "#") {
    const [brokenCount, ...leftoverRuns] = counts;
    for (let i = 0; i < brokenCount; i++) {
      // If there is a working spring, this wont work.
      // broken or ? is fine
      if (springs[i] === ".") {
        return 0;
      }
    }
    // If there is a broken one on count + 1, this wont work.
    // working or ? is fine.
    if (springs[brokenCount] === "#") {
      return 0;
    }

    // Jump to the end of this broken count, and start check again.
    return countWays(springs.slice(brokenCount + 1), leftoverRuns);
  }
  // we're left with an unknown ("?") ... so try both options.
  return (
    countWays("#" + springs.slice(1), counts) + countWays("." + springs.slice(1), counts)
  );
}

const countWays = _.memoize(_countWays, (...args) => JSON.stringify(args))
