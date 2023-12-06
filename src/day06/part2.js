import { parseInput2 } from './shared.js';
import _ from "lodash-es";
import { winsForRace } from './part1.js';

const part2 = (rawInput) => {
  const input = parseInput2(rawInput);

  return winsForRace(input);
};

export default part2;