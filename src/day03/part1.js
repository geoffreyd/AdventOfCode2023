import { parseInput } from './shared.js';
import _ from "lodash-es";
import { aroundOffsets } from '../utils/index.js';

export function validNumbers(grid, gears = false) {
  const nums = []
  const gearNums = {}

  const maxY = grid.length - 1;
  grid.forEach((row, y) => {
    const rowStr = row.join('');
    const rowNums = _(rowStr).chain().split(/[^\d]/).remove(x => x !== "").value();
    let lastIdx = -1;

    const maxX = row.length - 1;

    rowNums.forEach((numStr) => {
      const startX = rowStr.indexOf(numStr, lastIdx);

      lastIdx = startX + numStr.length;
      // console.log("Searching", numStr, "in", rowStr, "found", startX);
      // console.log("found string at", startX);
      const endX = startX + numStr.length
      const found = _.chain(_.range(startX, endX)).map((x) => {
        return _.find(aroundOffsets, ([x2, y2]) => {
          if (x + x2 < 0 || x + x2 > maxX || y + y2 < 0 || y + y2 > maxY) {
            return false;
          }
          // console.log("looking at", [x + x2, y + y2], 'found', input[y + y2][x + x2]);
          const val = grid[y + y2][x + x2];
          const match = val.match(/[^.\d]/) || val == '*';
          if (gearNums && val == '*') {
            gearNums[[x + x2, y + y2]] ||= new Set;
            gearNums[[x + x2, y + y2]].add(_.parseInt(numStr))
          }
          if (match) {
            return val;
          }
        });
      }).compact().value()

      // console.log("found", found);
      if (found.length) {
        nums.push(numStr)
      }
    })
  });

  if (gears) {
    return gearNums;
  }

  return nums;
}


const part1 = (rawInput) => {

  const input = parseInput(rawInput);

  const nums = validNumbers(input);

  // return nums

  return _(nums).map(_.parseInt).sum();
};

export default part1;