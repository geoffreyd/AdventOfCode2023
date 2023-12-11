import { parseInput } from './shared.js';
import _ from "lodash-es";
import * as math from 'mathjs';
import {
  findInGrid,
  generatePairs
} from './part1.js';

const part2 = (rawInput) => {
  const grid = parseInput(rawInput);

  const expantions = expandGrid(grid)
  // console.log(expantions);

  // printGrid(expandedGrid)
  const galaxies = findInGrid(grid, '#')

  const connections = generatePairs(galaxies)

  const distances = connections
    .map(([a, b]) => manhattanDistance(a, b, expantions, 1000000, galaxies))

  return _.sum(distances);
};

export default part2;

export function expandGrid(grid) {
  const emptyRows = grid.map(row => row.every(i => i == '.'));
  const width = grid[0].length

  const emptyCols = _.range(0, width).map(i => {
    return math.column(grid, i).every(i => i == '.')
  })

  return {
    emptyRows,
    emptyCols
  }
}

export function manhattanDistance(point1, point2, expantions, multi, galaxies) {
  const distance = Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
  const p1 = galaxies.indexOf(point1) + 1
  const p2 = galaxies.indexOf(point2) + 1

  const ys = [point1[1], point2[1]].sort(_.subtract)
  const xs = [point1[0], point2[0]].sort(_.subtract)

  const emptyRows = expantions.emptyRows
    .slice(ys[0], ys[1])
    .filter(Boolean).length
  const emptyCols = expantions.emptyCols
    .slice(xs[0], xs[1])
    .filter(Boolean).length

  const ret = distance + ((emptyRows + emptyCols) * (multi - 1))
  // if (p1 == 1 && p2 == 3) {
  //   console.log('Distance', `[${p1} -> ${p2} = ${distance}]`, 'empty:', emptyRows, emptyCols, '>', ret);
  //   console.log(point1, point2, '||', xs, ys);
  //   console.log('empty rows', expantions.emptyRows.slice(ys[0], ys[1]));
  //   console.log('empty cols', expantions.emptyCols.slice(xs[0], xs[1]));
  // }

  return ret
}
