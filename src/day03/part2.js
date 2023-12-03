import { parseInput } from './shared.js';
import _ from "lodash-es";
import { validNumbers } from './part1.js';


const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const gearLocs = {}

  const gears = validNumbers(input, true)

  return _(gears).chain()
    .values()
    .filter(s => s.size == 2)
    .map(s => _.multiply.apply(null, Array.from(s)))
    .sum()
    .value();

};

export default part2;
