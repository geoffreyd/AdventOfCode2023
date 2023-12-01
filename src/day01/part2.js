import { parseInput } from './shared.js';
import { firstLast } from './part1.js';
import _ from "lodash-es";
import * as R from "ramda";

export const words = {
  one: "o1e",
  two: "t2o",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
  eight: "e8t",
  nine: "n9e",
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const swapped = input.map(line => {

    Object.entries(words).forEach(([word, num]) => {
      // console.log('replacing', word, num)
      line = line.replaceAll(word, num)
    });
    return line
  })
  // console.log("after swap", swapped);


  const numbers = firstLast(swapped);
  // console.log('finding', numbers);

  return _.sum(numbers).toString();

  return numbers;
};

export default part2;