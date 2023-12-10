import _ from "lodash-es";

export const parseInput = (rawInput) => {
  return rawInput.split("\n").map(line => line.split(' ').map(_.parseInt))
};
