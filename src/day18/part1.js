import { parseInput } from './shared.js';
import _ from "lodash-es";
import { printUnknownGrid, pointsAround, gridExtents } from '../utils/grid.js';
import { log } from 'console';
import { areaOfPoly, instructionsToPoly } from './part2.js';

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const poly = instructionsToPoly(input);

  return areaOfPoly(poly);


  const start = [250, 250];
  const grid = []
  // followDirection(grid, input, start);

  // log('extents', gridExtents(grid))

  // const [fill, newGrid] = floodFill(grid, [start[0] -1, start[1] + 1]);
  // log('new extents', gridExtents(newGrid))
  // printUnknownGrid(newGrid,1);

  return fill.size;
};

export default part1;

export const directionOffsets = {
  'R': [1, 0],
  'L': [-1, 0],
  'U': [0, 1],
  'D': [0, -1],
};

function followDirection(grid, input, start) {
  const [x, y] = start;
  let currPoint = [x, y];

  for (let i = 0; i < input.length; i++) {
    const { direction, distance } = input[i];
    const points = pointsInDirection(currPoint, direction, distance);

    for (const point of points) {
      const [x, y] = point;
      grid[x] ??= [];
      grid[x][y] = '#';
      currPoint = point;
    }
  }
}

function pointsInDirection(start, direction, distance) {
  const [x, y] = start;
  const [dx, dy] = directionOffsets[direction];

  const points = [];

  for (let i = 1; i <= distance; i++) {
    points.push([x + i * dx, y + i * dy]);
  }

  return points;
}

function floodFill(grid, start) {
  const newGrid = _.cloneDeep(grid);
  const [x, y] = start;
  const queue = [[x, y]];
  const visited = new Set();

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const key = `${x},${y}`;
    if (visited.has(key)) {
      continue;
    }
    newGrid[y] ??= [];
    newGrid[y][x] = 'O';
    visited.add(key);

    const neighbors = pointsAround(grid, [x, y]);
    // log('neighbors', neighbors)
    for (const neighbor of neighbors) {
      const [x, y] = neighbor;
      if ((grid[y] ?? [])[x] === '#') {
        visited.add(`${neighbor[0]},${neighbor[1]}`);
        continue;
      }
      queue.push([x, y]);
    }
  }

  return [visited, newGrid];
}
