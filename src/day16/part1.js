import { parseInput } from './shared.js';
import _ from "lodash-es";
import { printGrid } from '../utils/grid.js';

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const energized = followPath(input, { x: 0, y: 0, direction: 'right' });

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

const transforms = {
  '\\': {
    'right': 'down',
    'down': 'right',
    'left': 'up',
    'up': 'left',
  },
  '/': {
    'right': 'up',
    'down': 'left',
    'left': 'down',
    'up': 'right',
  },
  '.': {
    'right': 'right',
    'down': 'down',
    'left': 'left',
    'up': 'up',
  },
}

export function followPath(grid, start, log = false) {
  const energizedPoints = new Set();
  const energizedSet = new Set();

  const queue = [start];

  function queuePoint(point) {
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

  function queueDirection(currPoint, direction) {
    queuePoint({ ...addPoint(currPoint, directions[direction]), direction });
  }

  while (queue.length ) {
    let currPoint = queue.pop();

    let currDirection = currPoint.direction;
    const currValue = grid[currPoint.y][currPoint.x];
    energizedPoints.add(`${currPoint.x},${currPoint.y}`);

    switch (currValue) {
      case "|":
        if (currDirection === 'left' || currDirection === 'right') {
          queueDirection(currPoint, 'up');
          queueDirection(currPoint, 'down');
        } else {
          queueDirection(currPoint, currDirection);
        }
        break;
      case "-":
        if (currDirection === 'up' || currDirection === 'down') {
          queueDirection(currPoint, 'left');
          queueDirection(currPoint, 'right');
        } else {
          queueDirection(currPoint, currDirection);
        }
        break;
      default:
        queueDirection(currPoint, transforms[currValue][currDirection]);
        break;
    }
  }
  if (log) {
    drawEnergised(grid, energizedSet)
  }
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
    const [x, y, direction] = point.split(',');
    // console.log(x, y, direction);
    const existing = gridCopy[y][x];
    if (existing == '.') {
      gridCopy[y][x] = swap[direction] ?? '#';
    } else if (['<', '>', '^', 'v'].includes(existing)) {
      gridCopy[y][x] = 2;
    } else if (existing == 2) {
      gridCopy[y][x] = 3;
    } else if (existing == 3) {
      gridCopy[y][x] = 4;
    }
  })

  printGrid(gridCopy);

  return gridCopy;
}
