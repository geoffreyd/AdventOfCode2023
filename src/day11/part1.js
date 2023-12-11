import { parseInput } from './shared.js';
import _ from "lodash-es";
import * as math from 'mathjs';
import { printGrid } from '../utils/grid.js'

const part1 = (rawInput) => {
  const grid = parseInput(rawInput);

  const expandedGrid = expandGrid(grid)

  // printGrid(expandedGrid)
  const galaxies = findInGrid(grid, '#')

  const connections = generatePairs(galaxies)

  const distances = connections.map(([a, b]) => manhattanDistance(a,b))

  return _.sum(distances);
};

export default part1;

export function expandGrid(grid) {
  const emptyRows = grid.map(row => row.every(i => i == '.'));
  const width = grid[0].length

  const emptyCols = _.range(0, width-1).map(i => {
    return math.column(grid, i).every(i => i == '.')
  })

  _.eachRight(emptyRows, (expand, idx) => {
    if (expand) {
      grid = insertRow(grid, idx)
    }
  })

  // now do the same for columns:
  _.eachRight(emptyCols, (expand, idx) => {
    if (expand) {
      grid = insertColumn(grid, idx)
    }
  })

  return grid
}

export function insertRow(grid, idx) {
  // Create an empty row
  const emptyRow = new Array(grid[0].length).fill('.');

  // Insert the empty row at the specified index
  grid.splice(idx, 0, emptyRow);

  return grid;
}

export function insertColumn(grid, idx) {
  // Create an empty column
  const emptyColumn = new Array(grid.length).fill('.');

  // Insert the empty column at the specified index in each row
  grid.forEach(row => {
    row.splice(idx, 0, '.');
  });

  return grid;
}

export function findInGrid(grid, toFind) {
  const positions = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === toFind) {
        positions.push([j, i]);
      }
    }
  }
  return positions;
}

export function manhattanDistance(point1, point2) {
  return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}

export function generatePairs(array) {
  let pairs = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      pairs.push([array[i], array[j]]);
    }
  }
  return pairs;
}