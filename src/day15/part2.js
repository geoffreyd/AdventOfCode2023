import { parseInput } from './shared.js';
import _ from "lodash-es";
import { hash } from './part1.js';
import { has } from 'ramda';

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const lensBoxes = {}

  input.forEach(instruction => {
    if (instruction.includes('=')) {
      const [label, lens] = instruction.split('=');
      const box = hash(label);
      lensBoxes[box] ??= [];
      const lenses = lensBoxes[box];
      const existingIdx = lenses.findIndex(([lab, __]) => lab === label);
      // console.log('searching for', label, 'in', lenses, 'found', existingIdx);
      if (existingIdx > -1) {
        // console.log('going to replace', label, 'in', lenses);
        lenses.splice(existingIdx, 1, [label, lens]);
      } else {
        lensBoxes[box].push([label, lens]);
      }

    } else if (instruction.endsWith('-')) {
      const label = instruction.slice(0, -1);
      const box = hash(label);
      lensBoxes[box] ??= [];
      const lenses = lensBoxes[box];
      const lensIndex = lenses.findIndex(([lab, __]) => lab === label);
      if (lensIndex > -1) {
        // console.log('going to remove', label, 'from', lenses);
        lensBoxes[box].splice(lensIndex, 1);
      }
    } else {
      console.log('ERROR: invalid instruction');
    }
    // console.log(instruction, lensBoxes);
  });

  // console.log(lensBoxes);
  return _.sum(scoreLenses(lensBoxes));
};

export default part2;

/*
To confirm that all of the lenses are installed correctly, add up the focusing power of all of the lenses. The focusing power of a single lens is the result of multiplying together:

One plus the box number of the lens in question.
The slot number of the lens within the box: 1 for the first lens, 2 for the second lens, and so on.
The focal length of the lens.
  @param {Record<number, Array<[string, number]>>} lensBoxes
*/
function scoreLenses(lensBoxes) {
  const scores = [];
  Object.entries(lensBoxes).forEach(([box, lenses]) => {
    let boxScore = +box + 1;
    lenses.forEach(([_, lens], idx) => {
      const lensScore = boxScore * (idx + 1) * lens;
      // console.log('box', boxScore, 'lens idx', idx+1, 'lens', lens, 'score', lensScore);
      scores.push(lensScore);
    });

  })

  return scores
}