import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const lines = rawInput.split("\n")

  const parsedLines = lines.map(line => {
    const [gameNo, gameDeets] = line.split(":")

    const counts = gameDeets
      .split(";")
      .map(deets =>
        _(deets).chain()
          .split(",")
          .map(cubes => {
            const match = cubes.match(/(\d+) (\w+)/);
            return [match[2], parseInt(match[1], 10)]
          })
          .fromPairs()
          .value()
      )

    // console.log(gameNo, counts);
    const gameNumber = parseInt(gameNo.match(/Game (\d+)/)[1], 10);
    return [gameNumber, counts];
  })

  return parsedLines;
};
