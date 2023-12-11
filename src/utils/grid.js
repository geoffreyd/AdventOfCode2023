export const aroundOffsets = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], /* self */ [1, 0],
  [-1, 1], [0, 1], [1, 1]
]

/**
 * Returns an array of points and their corresponding values around a given point in a grid.
 * @template T
 * @param {Array<Array<T>>} grid - The grid containing the points.
 * @param {[number, number]} point - The coordinates of the center point [x, y].
 * @param {typeof aroundOffsets} [offsets=aroundOffsets] - The offsets to calculate the surrounding points.
 * @returns {Array<Array<[number,number], T>} - An array of points and their corresponding values.
 */
export function valuesAround(grid, [x1, y1], offsets = aroundOffsets) {
  const vals = [];
  const maxY = grid.length - 1;
  const maxX = grid[0].length - 1;

  offsets.forEach(([x2, y2]) => {
    const y = y1 + y2;
    const x = x1 + x2;
    if (x < 0 || x > maxX || y < 0 || y > maxY) {
      return;
    }
    vals.push([[x, y], grid[y][x]]);
  })

  return vals;
}


export function pointsAround(grid, [x1, y1], offsets = aroundOffsets) {
  const vals = [];
  const maxY = grid.length - 1;
  const maxX = grid[0].length - 1;

  offsets.forEach(([x2, y2]) => {
    const y = y1 + y2;
    const x = x1 + x2;
    if (x < 0 || x > maxX || y < 0 || y > maxY) {
      return;
    }
    vals.push([x, y]);
  })

  // console.log("pointsAround", [x1, y1], offsets, "=>", vals);
  return vals;
}

export function printGrid(grid) {
  console.log('   ------');
  grid.forEach(row => {
    console.log(row.join(''));
  })
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
