import { parseInput } from './shared.js';
import _ from "lodash-es";
import {
  cardenalOffsets,
  printGrid,
  findInGrid,
  gridExtents,
  printUnknownGrid
} from '../utils/grid.js';
import { log } from 'console';

const part2 = (rawInput) => {
  return solvePart2();

  const input = parseInput(rawInput);

  // const extents = gridExtents(input);

  const start = findInGrid(input, 'S')[0];
  // log('start', start)

  const neededSteps = 131 * 3 + 65; // move to edge, then do 3 loops around the grid

  const walked = walkStep(input, { [start]: {'0,0': true} }, 0);

  // return Object.values(walked).map(Object.keys).flat().length;
  // log('walked', walked)
  // log('first', walked[0])

  return _.sum(Object.values(walked));
};

export default part2;

function walkStep(grid, positions, steps) {
  // log('walkStep', { positions, steps })
  if (steps === 131 * 3 + 65) {
    return positions;
  }

  if (steps % 131 === 65) {
    log('step', steps, 'positions', Object.keys(positions).length)
  }

  const newPositions = {};
  Object.entries(positions).forEach(([key, steps]) => {
    const [x, y] = key.split(',').map(Number);

    const points = pointsAround(grid, [x, y], cardenalOffsets);
    points.forEach(([x, y]) => {
      const newKey = [x, y].join(',');
      newPositions[newKey] = true;
    })
  });

  return walkStep(grid, newPositions, steps + 1);
}


function pointsAround(grid, [x1, y1], offsets = cardenalOffsets) {
  const maxX = grid[0].length;
  const maxY = grid.length;
  // log('extents', [[maxX, maxY]])
  const vals = [];

  offsets.forEach(([x2, y2]) => {
    const y = y1 + y2;
    const x = x1 + x2;

    let lookupX = x % maxX;
    if (lookupX < 0) {
      lookupX += maxX;
    }
    let lookupY = y % maxY;
    if (lookupY < 0) {
      lookupY += maxY;
    }

    const layer = [
      Math.trunc(x / maxX),
      Math.trunc(y / maxY),
    ]
    // log('checking', [x, y], [lookupX, lookupY])
    // log('value at lookup', grid[lookupY][lookupX]);

    if (grid[lookupY][lookupX] !== '#') {
      vals.push([x, y]);
    }
  })

  // console.log("pointsAround", [x1, y1], offsets, "=>", vals);
  return vals;
}

function solvePart2() {
  /* 26501365 steps
   * 65 distance from edge
   * 131 width of grid
   *
   * Outputs from walkStep:
   * step 65 positions 3751 [First value used]
   * step 196 positions 33531
   * step 327 positions 92991
   *
   */

  const step1 = 3751n;
  const step2 = 33531n;
  const step3 = 92991n;
  const diff1 = step2 - step1;
  const diff2 = step3 - step2;
  const diff3 = diff2 - diff1;

  const f = x => (step1 + diff1 * x + x * (x - 1n) * diff3 / 2n);

  return f(202300n); // 131*202300+65 = 26501365

}
