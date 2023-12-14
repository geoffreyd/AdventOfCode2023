import { parseInput } from './shared.js';
import _ from "lodash-es";
import * as math from 'mathjs'
import { printGrid, rotateGrid } from '../utils/grid.js';

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const overlaps = input.map(block => findMirrors(block))

  return _.sum(overlaps);
};

export default part1;

function findMirrors(grid) {
  let rotate = 0

  while (rotate < 4) {
    // console.log('searching grid');
    // printGrid(grid)
    const [head, ...tail] = grid;
    const matchings = _.map(tail, (row, idx) => row == head ? idx : -1)
      .filter(x => x > -1)
      .reverse();
    // console.log('matchings', matchings);

    for (let index = 0; index < matchings.length; index++) {
      const matching = matchings[index];
      // console.log('matching', matching);
      if (matching >= 0 && confirmMirror(grid, 0, matching + 1)) {
        const endOfMirror = matching + 1
        const mirror = (endOfMirror + 1) / 2
        const points = score(mirror, rotate, grid.length);
        // console.log('found direction', mirror, grid.length, points);
        return points;
      }
    }
    rotate++;
    grid = rotateGrid(grid, true)
  }

  // for (let index = 0; index < grid.length - 1; index++) {
  //   const headRow = grid[index];

  //   const toSearch = grid.slice(index + 1)
  //   const matching = toSearch.findLastIndex(row => row == headRow)

  //   if (matching > -1) {
  //     const check = confirmMirror(grid, index, index + matching)
  //     if (check) {
  //       console.log('found mirror at', index + (toSearch.length + 1) / 2);
  //       return index + (toSearch.length + 1) / 2
  //     }
  //   }
  // }
  return -1
}

function score(mirror, rotate, gridLength) {
  switch (rotate) {
    case 0: // no rotation, horizontal mirror
      return mirror * 100;
    case 1:
      return mirror;
    case 2: // 180 rotation, horizontal mirror
      return (gridLength - mirror) * 100;
    case 3:
      return (gridLength - mirror);
    default:
      break;
  }
}

function confirmMirror(grid, idx1, idx2) {
  // console.log('checking', idx1, idx2);
  while (idx1 < idx2) {
    const g1 = grid[idx1];
    const g2 = grid[idx2];
    // console.log('comparing grid', g1, g2);
    if (g1 != g2) {
      return false
    }
    idx1 += 1
    idx2 -= 1
  }

  return true
}
