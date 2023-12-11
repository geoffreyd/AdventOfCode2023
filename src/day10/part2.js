import { parseInput } from './shared.js';
import _ from "lodash-es";
import { connections, derterminStart } from './part1.js';
import { pointsAround, printGrid } from '../utils/grid.js';

const part2 = (rawInput) => {
  const grid = parseInput(rawInput);


  const startPoint = derterminStart(grid);
  const startChar = startPoint[0] < 20 ? 'F' : 'J';

  const path = followPath2(grid, startPoint, startChar);
  const pathLocs = _.keys(path)

  const count = countTrapped(grid, pathLocs)
  // printGrid(grid)

  return count
};

export default part2;

function followPath2(grid, startPoint, startChar) {
  const distances = {};
  const countedPipes = ['|', 'F', '7']
  distances[startPoint] = 0;
  // console.log("Replacing Start", startPoint, startChar);
  grid[startPoint[1]][startPoint[0]] = startChar;

  // printGrid(grid)

  const queue = [[startPoint, 0]];
  let currChar, currPoint, currConns, currDist;

  while (queue.length > 0) {
    [currPoint, currDist] = queue.shift();
    currChar = grid[currPoint[1]][currPoint[0]];

    grid[currPoint[1]][currPoint[0]] = countedPipes.includes(currChar) ? '*' : 'o';

    // console.log("looking at", currPoint, currChar, currDist, grid[currPoint[1]]);
    if (currChar == '.') {
      console.log("##### - found . at", currPoint);
    }
    if (!connections[currChar]) {
      continue
    }
    currConns = pointsAround(grid, currPoint, connections[currChar])
    currConns.forEach(p => {
      if (distances[p] == undefined || distances[p] > currDist + 1) {
        queue.push([p, currDist + 1])
        distances[p] = currDist + 1;
      }
    })
  }

  // printGrid(distances)

  return distances;

}

function pathToLeft(grid, point) {
  const items = []
  while (point[0] >= 0) {
    point = [point[0] - 1, point[1]];
    items.push(grid[point[1]][point[0]]);
  }
  return items;
}

function countTrapped(grid, path) {
  let trapped = [];
  grid.forEach((row, y) => {
    row.forEach((item, x) => {
      const ptStr = `${x},${y}`;
      if (!path.includes(ptStr)) {
        const left = pathToLeft(grid, [x, y]);

        if (left.filter(i => i == '*').length % 2 == 1) {
          trapped.push([x, y]);
          grid[y][x] = 'I'
        }
      }
    })
  })
  return trapped.length;
}
