import { parseInput } from './shared.js';
import _ from "lodash-es";
import { directionOffsets } from './part1.js';
import { log } from 'console';

const instDir = {
  0: 'R',
  1: 'D',
  2: 'L',
  3: 'U',
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const instructions = input.map(({ color }) => {
    const match = color.match(/#([a-f0-9]{5})([a-f0-9]{1})/);
    const [_, distance, dir] = match;
    return { distance: parseInt(distance, 16), direction: instDir[dir] };
  })

  const poly = instructionsToPoly(instructions);
  // log('poly', poly);
  const length = areaOfPoly(poly);

  return length;
};

export default part2;

export function instructionsToPoly(instructions) {
  let currPoint = [0, 0];
  const poly = [currPoint];

  for (const { direction, distance } of instructions) {
    currPoint = pointAtDirection(currPoint, direction, distance)
    poly.push(currPoint);
  }

  return poly;
}

function pointAtDirection(start, direction, d) {
  const [x, y] = start;
  const [dx, dy] = directionOffsets[direction];

  return [x + d * dx, y + d * dy]
}

export function areaOfPoly(polygon) {
  let area = 0;
  let perimeter = 0;
  for (let i = 1; i < polygon.length; i++) {
    const [x1, y1] = polygon[i - 1];
    const [x2, y2] = polygon[i];
    area += x1 * y2 - x2 * y1;
    perimeter += Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  }
  return Math.abs(area / 2) + perimeter / 2 + 1;
}
