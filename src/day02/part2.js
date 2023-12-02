import { parseInput } from './shared.js';
import _ from "lodash-es";
import * as R from "ramda";

const part2 = (rawInput) => {
  const games = parseInput(rawInput);

  const mins = games.map(([gameNo, cubeSets]) => {
    const max = {
      red: 0,
      blue: 0,
      green: 0
    }

    cubeSets.forEach(cubSet => {
      Object.entries(cubSet).forEach(([color, count]) => {
        const curr = max[color];
        if (count > curr) {
          max[color] = count;
        }
      })
    })

    const minCounts = Object.values(max)

    return [gameNo, minCounts.reduce((acc, count) => acc * count)];
  });

  // return mins;

  return mins.reduce((acc, [game, power]) => acc + power, 0);
};

export default part2;