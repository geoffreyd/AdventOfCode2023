import { parseInput } from './shared.js';
import _ from "lodash-es";

const part1 = (rawInput, part2 = false) => {
  const input = part2 ? rawInput : parseInput(rawInput);

  // return startIsValid('..#.....', [5, 2, 1])

  // const input = parseInput(`.???#???#??? 3,1`);

  const options = input.map((row, idx) => {
    varCache = {};
    const variants = getVarients(row.springs, row.counts);
    const valid = _.filter(
      Array.from(variants),
      v => isValid(v, row.counts)
    ).length
    console.log('row', idx, row.springs.join(''), row.counts, 'candidates', variants.size, 'valids:',valid);
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
  // console.log('checking valid', springs, groups, counts);

  return _.isEqual(groups, counts)
}

function startIsValid(springs, counts, fullLength) {
  if (springs.includes('?')) { return false }
  // if (springs.length < counts[0]) {
  //   return true;
  // }
  var groups = springs.split('.')
  .filter(i => i != '')
    .map(i => i.length)

  const ret = arrComp(counts, groups);

  // console.log('checking valid', springs, counts, groups, ret);

  return ret;
  return _.startsWith(counts.toString(), groups.slice(0, groups.length-1).toString())
}

const charSubs = ['.', '#']

let varCache;

function getVarients(springList, counts) {
  if (varCache[springList.join('')]) {
    // console.log('cache hit', springList.join(''));
    return varCache[springList.join('')];
  }
  // console.log('finding variants for', springList.join(''))
  let variants = new Set;

  for (let idx = 0; idx < springList.length; idx++) {
    const char = springList[idx];
    if (char == '?') {
      charSubs.forEach(subChar => {
        const spring = springList.join('').split('')
        spring[idx] = subChar
        const springStr = spring.join('')
        const start = spring.slice(0, idx + 1).join('')
        // console.log('new varient', handChars);
        if (!spring.includes('?') && isValid(springStr, counts)) {
          variants.add(springStr)
        } else if(!start.includes('?')) {
          const isValid = startIsValid(start, counts, spring.length)

          if (isValid && !start.includes('?')) {
            const v = getVarients(spring, counts);
            varCache[springStr] ??= v;
            if (v.size) {
              variants = union(variants, v)
              // console.log(variants);
            }
          }
        }
        // variants = variants.concat(getVarients(spring))
      })
    }
  }
  return variants;
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
