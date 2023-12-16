import { find } from 'ramda';
import { parseInput } from './shared.js';
import _ from "lodash-es";
import { followPath } from './part1.js';

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const edgePoints = findEdgePoints(input);

  const costs = edgePoints.map(point => {
    const ret = followPath(input, point)

    // console.log(point, ret.size);

    return ret.size;
  });

  return _.max(costs);
};

export default part2;

function findEdgePoints(grid) {
  const edgePoints = [];
  for (let x = 0; x < grid[0].length; x++) {
    edgePoints.push({ x, y: 0, direction: 'down' });
    edgePoints.push({ x, y: grid.length - 1, direction: 'up' });
  }
  for (let y = 0; y < grid.length; y++) {
    edgePoints.push({ x: 0, y, direction: 'right' });
    edgePoints.push({ x: grid[0].length - 1, y, direction: 'left' });
  }
  return edgePoints;
}
