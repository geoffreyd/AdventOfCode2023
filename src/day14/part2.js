import { parseInput } from './shared.js';
import _ from "lodash-es";
import { slideRocksNorth, countWeightsInGrid } from './part1.js';
import { printGrid, rotateGrid } from '../utils/grid.js';
import * as math from 'mathjs';

let cycleCount = 0;

const part2 = (rawInput) => {
  let grid = parseInput(rawInput);

  const combos = {}
  cycleCount = 0;

  const cycles = 1000000000;
  // const cycles = 10;

  for (let cycle = 0; cycle < cycles; cycle++) {
    // one cycle is 4 rotations
    grid = performCycle(grid);


    const gridString = JSON.stringify(grid);
    if (combos[gridString]) {
      const cycleDiff = cycle - combos[gridString];
      const remainingCycles = cycles - cycle - 1;

      console.log("Found a duplicate grid at cycle", cycle, combos[gridString], 'diff', cycleDiff);
      const remainingMod = remainingCycles % cycleDiff;
      console.log("Jumping to", cycles - remainingMod);

      console.log("cycleCount", cycleCount);
      for (let j = 0; j < remainingMod; j++) {
        grid = performCycle(grid);
      }
      console.log("cycleCount", cycleCount);
      break;

    }
    combos[gridString] = cycle;

  }


  printGrid(grid);
  const countWeights = countWeightsInGrid(grid);

  return countWeights;
};

export default part2;

function performCycle(grid) {
  // one cycle is 4 rotations
  _.times(4, () => {
    slideRocksNorth(grid);
    grid = rotateGrid(grid);
  });
  // printGrid(grid);
  cycleCount++;
  return grid;
}
