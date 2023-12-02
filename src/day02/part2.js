import { parseInput } from './shared.js';
import _ from "lodash-es";

const part2 = (rawInput) => {
  const games = parseInput(rawInput);

  // Loop over each game each game
  return games.map(([gameNo, cubeSets]) =>
    // In each game, loop over each handful of cubes
    _(cubeSets)
      .chain()
      // Find the max of each color in each handful
      .reduce((acc, cubSet) => {
        _(cubSet).toPairs()
          .forEach(([color, count]) => {
            const curr = acc[color];
            if (count > curr) {
              acc[color] = count;
            }
          })
        return acc;
      }, { red: 0, blue: 0, green: 0 })
      // Pull out the numbers
      .values()
      // Find the power
      .reduce((acc, count) => acc * count)
      .value() // de-chain
  )
  // Sum all the powers
  .reduce((acc, power) => acc + power, 0)
};

export default part2;
