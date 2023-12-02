import { parseInput } from './shared.js';
import _ from "lodash-es";
import * as R from "ramda";

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const allowedCubes = {
  red: 12,
  green: 13,
  blue: 14
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const allowedGames = input.filter(([game, cubeSets]) => {
    return _.every(cubeSets, (cubeSet) => {
      return _.every(Object.entries(cubeSet), ([color, count]) => {
        return count <= allowedCubes[color];
      })
    });
  })
  // console.log(game, "> ", cubeSets);

  return _.sum(
    allowedGames.map(result => result[0])
  )
};

export default part1;