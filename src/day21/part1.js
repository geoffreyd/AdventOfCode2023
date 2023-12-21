import { parseInput } from './shared.js';
import _ from "lodash-es";
import {
  cardenalOffsets,
  pointsAround,
  printGrid,
  findInGrid
} from '../utils/grid.js';
import { log } from 'console';

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const start = findInGrid(input, 'S')[0];
  log('start', start)

  const neededSteps = input.length > 12 ? 64 : 6;

  const walked = walkStep(input, {[start]: 1}, neededSteps);

  // log('walked', walked)
  // log('first', walked[0])

  return Object.keys(walked).length;
};

export default part1;

function walkStep(grid, positions, steps) {
  // log('walkStep', { positions, steps })
  if (steps === 0) {
    return positions;
  }

  const newPositions = {};
  Object.entries(positions).forEach(([key, steps]) => {
    const [x, y] = key.split(',').map(Number);
    const points = pointsAround(grid, [x, y], cardenalOffsets);
    points.forEach(([x, y]) => {
      const pointValue = grid[y][x];
      if (pointValue === '.' || pointValue === 'S') {
        const newKey = [x, y].join(',');
        if (newPositions[newKey]) {
          newPositions[newKey] = Math.min(newPositions[newKey], steps + 1);
        } else {
          newPositions[newKey] = steps + 1;
        }
      }
    })
  });

  return walkStep(grid, newPositions, steps - 1);
}


