import { parseInput } from './shared.js';
import _ from "lodash-es";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  // return startIsValid('..#.....', [5, 2, 1])

  // const input = parseInput(`.???#???#??? 3,1`);

  const options = input.map((row, idx) => {
  // const options = input.map((row, idx) => {
    varCache = {};

    const springs = row.springs;
    const counts = row.counts;

    const variants = new Set;
    const valid = getVarients(springs, counts, variants);
    // const valid = _.filter(
    //   Array.from(variants),
    //   v => isValid(v, counts)
    // ).length
    console.log('row', idx, springs.join(''), counts, 'candidates', variants.size, 'valids:',valid);
    return valid
  })

  // return options;
  return _.sum(options);
};

export default part1;

function isValid(springs, counts) {
  var groups = springs.split('.')
  .filter(i => i != '')
    .map(i => i.length)

  if (groups.length !== counts.length) { return false }
  // console.log('checking valid', springs, groups, counts);

  return _.isEqual(groups, counts)
}

function startIsValid(springs, counts, fullLength) {
  if (springs.includes('?')) { return false }
  if (springs.length > fullLength) { return false }

  var groups = springs.split('.')
  .filter(i => i != '')
    .map(i => i.length)

  if (groups.length > counts.length) { return false }

  const not_enough = _.last(groups) < counts[groups.length - 1] && _.last(springs) == '.'
  if (not_enough) { return false }

  const ret = arrComp(counts, groups);

  const excess = counts.slice(groups.length)
  const excessSum = _.sum(excess) + _.max([excess.length - 1, 0]);

  // console.log(
  //   'checking valid',
  //   _.padEnd(springs, fullLength),
  //   counts,
  //   groups,
  //   [
  //     fullLength - springs.length,
  //     excessSum
  //   ],
  //   ret && !(ret && fullLength - springs.length < excessSum)
  // );

  if (ret && fullLength - springs.length < excessSum) {
    return false
  }

  return ret;
}

const charSubs = ['.', '#']

let varCache;

function getVarients(springList, counts, variants) {
  let validOptions = 0

  if (varCache[springList]) {
    return varCache[springList]
  }

  for (let idx = 0; idx < springList.length; idx++) {
    const char = springList[idx];
    if (char == '?') {
      charSubs.forEach(subChar => {
        const spring = springList.join('').split('')
        spring[idx] = subChar
        const springStr = spring.join('')
        const start = spring.slice(0, idx + 1).join('')

        if (!spring.includes('?') && isValid(springStr, counts)) {
          // variants.add(springStr)
          validOptions += 1
        } else if(!start.includes('?')) {
          const isValid = startIsValid(start, counts, spring.length)

          if (isValid && !start.includes('?')) {
            validOptions += getVarients(spring, counts, variants);
          }
        }
      })
    }
  }
  varCache[springList] = validOptions;
  // return variants;
  return validOptions
}

function union(setA, setB) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}


function arrComp(excpected, inProgress) {
  const len = inProgress.length

  // console.log('comp', excpected, inProgress, len);

  if (len == 0 ) { return true }

  for (let i = 0; i < len; i++) {
    // if we're looking at the last one, it can be less than
    // console.log('>', i, ': ', excpected[i], '<>', inProgress[i]);
    if (i == len - 1 && inProgress[i] > excpected[i]) {
      return false;
    } else if (i !== len - 1 && inProgress[i] != excpected[i]) {
      return false
    }
  }

  return true;
}
