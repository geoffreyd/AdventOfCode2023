import { parseInput } from './shared.js';
import _ from "lodash-es";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const hashed = input.map(entry => hash(entry));

  return _.sum(hashed);
};

export default part1;

export function hash(str) {
  const ascii = str.split('').map(char => char.charCodeAt(0));
  return ascii.reduce((acc, char) => {
    return (acc + char) * 17 % 256;
  }, 0)
}
