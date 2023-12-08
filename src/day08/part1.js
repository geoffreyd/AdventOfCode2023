import { parseInput } from './shared.js';
import _ from "lodash-es";

export const instIdx = {
  'L': 0,
  'R': 1
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let curr = 'AAA';
  let steps = 0;
  let instructions = input.instructions;

  do {
    curr = navigate(curr, instructions, input.nodes, steps);
    steps += 1
  } while (curr !== 'ZZZ' && steps < 10000000)

  return steps;
};

export default part1;

export function navigate(curr, inst, nodes, step) {
  const h = inst[step % inst.length];
  return nodes[curr][instIdx[h]];
}
