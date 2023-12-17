import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n").map((line) => line.split("").map(_.parseInt));

  return input;
};
