import { parseInput } from './shared.js';
import _ from "lodash-es";
import * as R from "ramda";

export const firstLast = (input) => input.map(line => {
  // extract all digets from string
  const numbers = Array.from(line.matchAll(/\d/g))
  return +(_.first(numbers) + _.last(numbers))
})

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const numbers = firstLast(input);

  return _.sum(numbers).toString();
};

export default part1;