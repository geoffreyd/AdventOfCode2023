import { parseInput } from './shared.js';
import _ from "lodash-es";
import { printGrid } from '../utils/grid.js';

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const energized = followPath(input);

  // drawEnergised(input, energized);

  return energized.size;
};

export default part1;

const directions = {
  right: {x: 1, y: 0},
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  up: { x: 0, y: -1 },
}

function followPath(grid) {
  const energizedPoints = new Set();
  const energizedSet = new Set();

  const queue = [{ x: 0, y: 0, direction: 'right' }];

  function queueIf(point) {
    const { x, y, direction } = point;
    if (x < 0 || y < 0 || x >= grid[0].length || y >= grid.length) {
      return;
    }
    if (energizedSet.has(`${x},${y},${direction}`)) {
      return;
    }
    queue.push({ x, y, direction });
    energizedSet.add(`${x},${y},${direction}`);
  }


  while (queue.length ) {
    let currPoint = queue.shift();
    if (currPoint.x < 0 || currPoint.y < 0 || currPoint.x >= grid[0].length || currPoint.y >= grid.length) {
      continue;
    }

    let currDirection = currPoint.direction;
    const currValue = grid[currPoint.y][currPoint.x];
    energizedPoints.add(`${currPoint.x},${currPoint.y}`);

    switch (currValue) {
      case "|":
        if (currDirection === 'left' || currDirection === 'right') {
          queueIf({ ...addPoint(currPoint, directions['up']), direction: 'up' });
          queueIf({ ...addPoint(currPoint, directions['down']), direction: 'down' });
        } else {
          queueIf({ ...addPoint(currPoint, directions[currDirection]), direction: currDirection });
        }
        break;
      case "-":
        if (currDirection === 'up' || currDirection === 'down') {
          queueIf({ ...addPoint(currPoint, directions['left']), direction: 'left' });
          queueIf({ ...addPoint(currPoint, directions['right']), direction: 'right' });
        } else {
          queueIf({ ...addPoint(currPoint, directions[currDirection]), direction: currDirection });
        }
        break;
      case "\\":
        switch (currDirection) {
          case 'up':
            queueIf({ ...addPoint(currPoint, directions['left']), direction: 'left' });
            break;
          case 'down':
            queueIf({ ...addPoint(currPoint, directions['right']), direction: 'right' });
            break;
          case 'left':
            queueIf({ ...addPoint(currPoint, directions['up']), direction: 'up' });
            break;
          case 'right':
            queueIf({ ...addPoint(currPoint, directions['down']), direction: 'down' });
            break;
        }
        break;
      case "/":
        switch (currDirection) {
          case 'up':
            queueIf({ ...addPoint(currPoint, directions['right']), direction: 'right' });
            break;
          case 'down':
            queueIf({ ...addPoint(currPoint, directions['left']), direction: 'left' });
            break;
          case 'left':
            queueIf({ ...addPoint(currPoint, directions['down']), direction: 'down' });
            break;
          case 'right':
            queueIf({ ...addPoint(currPoint, directions['up']), direction: 'up' });
            break;
        }
        break;
      case ".":
        queueIf({ ...addPoint(currPoint, directions[currDirection]), direction: currDirection });
        break;
      default:
        console.log('oops', currValue, currDirection, currPoint);
        break;
    }

  }

  // console.log(energized);
  return energizedPoints;
}

function addPoint(point1, point2) {
  return { x: point1.x + point2.x, y: point1.y + point2.y };
}

function drawEnergised(grid, energized) {
  const gridCopy = _.cloneDeep(grid);
  const swap = {
    'right': '>',
    'left': '<',
    'up': '^',
    'down': 'v',
  }

  energized.forEach(point => {
    if (gridCopy[point.y][point.x] == '.') {
      gridCopy[point.y][point.x] = swap[point.direction] ?? '#';
    }
  })

  printGrid(gridCopy);

  return gridCopy;
}
