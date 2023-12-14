import { parseInput } from './shared.js';
import _ from "lodash-es";
import {
  printGrid
} from '../utils/grid.js';
import { count } from 'console';

const part1 = (rawInput) => {
  let grid = parseInput(rawInput);

  // printGrid(grid);
  slideRocksNorth(grid);
  // printGrid(grid);

  const countWeights = countWeightsInGrid(grid);

  return countWeights;
};

export default part1;

/**
 * Move all round rocks (O) upward, until they hit a wall (#) or another rock.
 * @param {string[][]} grid
 */
export function slideRocksNorth(grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  for (let x = 0; x < gridWidth; x++) {
    let y = 0;
    while (y < gridHeight) {
      if (grid[y][x] === "O") {
        let newY = y;
        while (newY > 0 && grid[newY - 1][x] === ".") {
          newY--;
        }
        if (newY !== y) {
          grid[newY][x] = "O";
          grid[y][x] = ".";
        }
      }
      y++;
    }
  }
}

/**
 * Count the weights of all rocks in the grid.
 * a round rock (O) has a weight of equal to it's distance from the bottom of the grid.
 * @param {string[][]} grid
 */
export function countWeightsInGrid(grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  let totalWeight = 0;
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (grid[y][x] === "O") {
        totalWeight += gridHeight - y;
      }
    }
  }
  return totalWeight;
}