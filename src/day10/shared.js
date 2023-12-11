import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n");

  return input.map(line => line.split(''));
};
