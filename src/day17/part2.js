import { parseInput } from './shared.js';
import _ from "lodash-es";
import { lowestCostPath } from "./part1.js";

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  // return directionalOffsetsP2

  const path = lowestCostPath(
    input,
    [0, 0],
    [input[0].length - 1, input.length - 1],
    directionalOffsetsP2
  );
  // const path = lowestCostPath(input, [input[0].length - 1, input.length - 1], [0, 0]);

  // drawPath(input, path);
  // return path;

  return _.last(path);
};

export default part2;

const directionalOffsetsP2 = {
  right: _.range(4, 11).flatMap(i => [
    [i, 0, 'up', i], [i, 0, 'down', i]
  ]),
  left: _.range(4, 11).flatMap(i => [
    [-i, 0, 'up', i], [-i, 0, 'down', i]
  ]),
  up: _.range(4, 11).flatMap(i => [
    [0, -i, 'left', i], [0, -i, 'right', i]
  ]),
  down: _.range(4, 11).flatMap(i => [
    [0, i, 'left', i], [0, i, 'right', i]
  ])
};