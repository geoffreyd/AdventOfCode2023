import { parseInput } from './shared.js';
import _ from "lodash-es";
import { pointsAround, printGrid } from '../utils/grid.js';
import { log } from 'console';

export const connections = {
  'F': [[1,0], [0,1]],
  '-': [[-1,0], [1,0]],
  '|': [[0,1], [0, -1]],
  'J': [[-1,0], [0,-1]],
  'L': [[0,-1], [1,0]],
  '7': [[-1,0], [0, 1]],
}

const part1 = (rawInput) => {
  const grid = parseInput(rawInput);

  const startPoint = derterminStart(grid);
  const startChar = startPoint[0] < 20 ? 'F' : 'J';

  // console.log("Starting with", startPoint, startChar);

  const distances = followPath(grid, startPoint, startChar);
  // printGrid(grid)

  // return _.values(distances)

  return _.max(_.values(distances));
};

export default part1;

export function derterminStart(grid) {
  const startY = _.findIndex(grid, row => row.includes('S'));
  const startX = _.findIndex(grid[startY], row => _.find(row, i => i == 'S'))

  return [startX, startY];
  // const around = pointsAround(grid, [startX, startY]);

  // around.each
}

export function followPath(grid, startPoint, startChar) {
  const distances = {}
  distances[startPoint] = 0;
  grid[startPoint[1]][startPoint[0]] = startChar;

  const queue = [[startPoint, 0]]
  let currChar, currPoint, currConns, currDist;

  while (queue.length > 0) {
    [currPoint, currDist] = queue.shift();
    currChar = grid[currPoint[1]][currPoint[0]];

    if (currChar == '.') {
      console.log("##### found . at", currPoint);
      continue;
    }
    if (!connections[currChar]) { continue }

    if (distances[currPoint] == undefined || currDist < distances[currPoint]) {
      // console.log('replacing', distances[currPoint], 'with', currDist);
      grid[currPoint[1]][currPoint[0]] = '*';
      distances[currPoint] = currDist;
    }
    currConns = pointsAround(grid, currPoint, connections[currChar])
    currConns.forEach(p => {
      if (p.toString() == '2,2') {
        console.log("looking at", currPoint, currChar, currDist, currConns);
      }
      queue.push([p, currDist + 1])
    })
    // printGrid(grid)
  }

  // printGrid(grid)
  // console.log(distances);

  return distances;
}

