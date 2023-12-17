import { parseInput } from './shared.js';
import _ from "lodash-es";
import { pointsAround, printGrid } from "../utils/grid.js";
import { log } from 'console';
import { to } from 'mathjs';

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  // return costOfsteps(input, [0, 0], 'right', 2);

  const path = lowestCostPath(input, [0, 0], [input[0].length - 1, input.length - 1]);
  // const path = lowestCostPath(input, [input[0].length - 1, input.length - 1], [0, 0]);

  // drawPath(input, path);
  // return path;

  return _.last(path);
};

export default part1;

const offsets = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const directionalOffsetsP1 = {
  right: [
    [1, 0, 'up', 1], [1, 0, 'down', 1],
    [2, 0, 'up', 2], [2, 0, 'down', 2],
    [3, 0, 'up', 3], [3, 0, 'down', 3],
  ],
  left: [
    [-1, 0, 'up', 1], [-1, 0, 'down', 1],
    [-2, 0, 'up', 2], [-2, 0, 'down', 2],
    [-3, 0, 'up', 3], [-3, 0, 'down', 3],
  ],
  up: [
    [0, -1, 'left', 1], [0, -1, 'right', 1],
    [0, -2, 'left', 2], [0, -2, 'right', 2],
    [0, -3, 'left', 3], [0, -3, 'right', 3],
  ],
  down: [
    [0, 1, 'left', 1], [0, 1, 'right', 1],
    [0, 2, 'left', 2], [0, 2, 'right', 2],
    [0, 3, 'left', 3], [0, 3, 'right', 3],
  ]
};

/*
 * An dijkstra's implementation for finding the lowest cost path through a grid.
 * The grid is a 2D array of costs.
 * extra rules:
 * can't travel straight for more than 3 spaces
 * can't go backwards
 * can't go diagonally
 *
 * @param {Array<Array<string>>} grid - The grid to traverse.
 * @param {[number, number]} start - The starting coordinates [x, y].
 * @param {[number, number]} end - The ending coordinates [x, y].
 *
 * @returns {Array<[number, number]>} - The path from start to end.
 */
export function lowestCostPath(grid, start, end, directionalOffsets = directionalOffsetsP1) {
  const cameFrom = {};
  const costs = {};
  const openSet = new PriorityQueue();
  const closedSet = new Set();

  const startCost = 0;

  openSet.enqueue(new Point(start[0], start[1], startCost, 'right'), 0);
  openSet.enqueue(new Point(start[0], start[1], startCost, 'down'), 0);
  costs['0,0,right'] = startCost;
  costs['0,0,down'] = startCost;

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue().value;

    // log('current', current.point.toString(), end.toString());
    if (_.isEqual(current.point.toString(), end.toString())) {
      return [current.cost]
      return reconstructPath(cameFrom, current, costs);
    }

    closedSet.add(current);

    const neighbors = pointsAround(grid, current.point, directionalOffsets[current.direction]);
    // log('new neighbors', neighbors);
    neighbors.forEach((neighbor) => {
      if (closedSet.has(neighbor.toString())) {
        return;
      }

      const [x, y, direction, length] = neighbor;
      const neighborKey = [x,y,direction].toString();

      const stepCost = costOfsteps(grid, neighbor, current.direction, length);

      const cost = costs[current.toString()] + stepCost;
      // log('acc cost', neighbor, ':', costs[current], '+', stepCost, '=', cost)
      if (!costs[neighborKey] || cost < costs[neighborKey]) {
        // log('setting cost', neighborKey, cost);
        costs[neighborKey] = cost;
        // cameFrom[neighborKey] = [...current.point, current.direction];
        openSet.enqueue(new Point(neighbor[0], neighbor[1], cost, direction), cost);
      }
    });
  }
  console.log("openSet", openSet.toString());

  return [];
}

function costOfsteps(grid, start, direction, length) {
  const directions = {
    right: [-1, 0], left: [1, 0], up: [0, 1], down: [0, -1],
  };
  // log("Start at", start.slice(0,2), 'Going:', direction, 'for', length)
  const steps = [];
  const dir = directions[direction];
  let cost = 0;
  let current = start;
  for (let i = 0; i < length; i++) {
    const [x, y] = current;
    steps.push([x,y, grid[y][x]]);
    // log("costOfsteps", current, dir, i, ">>>", grid[current[1]][current[0]])
    cost += grid[y][x];
    current = [x + dir[0], y + dir[1]];
  }
  // log('steps', steps)
  return cost;
}

function validPoint(grid, point) {
  const [x, y] = point;
  if (x < 0 || x > grid[0].length - 1 || y < 0 || y > grid.length - 1) {
    return false;
  }
  return true;

}


export class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    // log("enqueue", value, priority);
    this.values.push({ value, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.values.length === 0;
  }

  toString() {
    return this.values.map(({ value, priority }) => `${value} (${priority})`).join(', ');
  }
}

function reconstructPath(cameFrom, current, costs) {
  // log("reconstructPath", cameFrom, current.toString());
  const totalPath = [costs[current]];
  while (cameFrom[current.toString()] && totalPath.length < 100) {
    current = cameFrom[current];
    totalPath.push({
      cost: costs[current],
      point: current,
    });
    // log("reconstructPath", current.toString(), cameFrom[current.toString()])
  }

  return totalPath.reverse();
}

function drawPath(grid, path) {
  const newGrid = _.cloneDeep(grid);
  // log("drawPath", path);
  path.forEach(({ point, cost }) => {
    if (!point) {
      return;
    }
    newGrid[point[1]][point[0]] = ':' + (cost ?? ".");
  });
  printGrid(newGrid, 5);
}

class Point {
  constructor(x, y, cost, direction) {
    this.point = [x, y];
    this.cost = cost;
    this.direction = direction;
  }

  valueOf() {
    return this.point;
  }

  toString() {
    return [
      ...this.point,
      this.direction,
    ].toString();
  }
}