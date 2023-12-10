import { parseInput } from './shared.js';
import _ from "lodash-es";

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const lasts = input.map((historyValues) => {
    historyValues = historyValues.reverse()
    const steps = [historyValues]
    let diffs;
    do {
      diffs = eachCons(steps[steps.length - 1], 2).map(([a, b]) => b - a);
      steps.push(diffs)
    } while (!_.every(diffs, i => i == 0))

    // return steps
    return extrapolateSteps(steps)
  })

  // return lasts
  return _.sum(lasts);
};

export default part2;

function eachCons(array) {
  const ret = []
  for (let index = 0; index < array.length - 1; index++) {
    const element = array[index];
    ret.push([array[index], array[index + 1]])
  }
  return ret;
}

function extrapolateSteps(steps) {
  const projections = steps.map(step => {
    return _.last(step)
  })
  console.log(">>", steps);
  return _.sum(projections);
}
