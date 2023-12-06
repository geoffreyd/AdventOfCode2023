import { parseInput } from './shared.js';
import _ from "lodash-es";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const wins = input.map(race => winsForRace(race))

  return _.reduce(wins, (x,y) => x * y);
};

export default part1;


export function winsForRace([time, distance]) {
  return _.range(1, time).filter(t => {
    const d = t * (time - t)
    return d > distance;
  }).length
}
