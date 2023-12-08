import { parseInput } from './shared.js';
import _ from "lodash-es";
import { navigate } from './part1.js';
import * as math from 'mathjs';

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let currents = _.keys(input.nodes).filter(node => node[2] == 'Z');
  // console.log(input.nodes);

  const lengths = currents.map(current => pathLengthFor(current, input))

  return math.lcm(...lengths);
};

export default part2;

function pathLengthFor(curr, input) {
  let steps = 0;
  let instructions = input.instructions;

  do {
    curr = navigate(curr, instructions, input.nodes, steps);
    steps += 1
  } while (curr[2] !== 'Z' && steps < 10000000)

  return steps;
}
