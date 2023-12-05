import { parseInput } from './shared.js';
import _ from "lodash-es";

const part1 = (rawInput) => {
  const cards = parseInput(rawInput);

  return _(cards).chain()
    .map(card => {
      const overlap = _.intersection(card.winning, card.have)

      if (overlap.length == 0) {
        return 0;
      }

      return 2 ** (overlap.length - 1)
    })
    .sum()
    .value()
};

export default part1;