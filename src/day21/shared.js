import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n").map((line) => line.split(''));

  return input;
};
