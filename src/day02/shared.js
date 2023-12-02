import _ from "lodash-es";
import * as R from "ramda";

export const parseInput = (rawInput) => {
  const lines = rawInput.split("\n")

  const parsedLines = lines.map(line => {
    const [gameNo, gameDeets] = line.split(":")

    const counts = gameDeets.split(";").map(deets => {
      return R.fromPairs(deets.split(",").map(cubes => {
        const match = cubes.match(/(\d+) (\w+)/);
        return [match[2], parseInt(match[1], 10)]
      }));
    })

    // console.log(gameNo, counts);
    const gameNumber = parseInt(gameNo.match(/Game (\d+)/)[1], 10);
    return [gameNumber, counts];
  })

  return parsedLines;
};
