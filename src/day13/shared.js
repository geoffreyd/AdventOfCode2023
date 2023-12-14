import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n\n").map(block => block.split('\n'))

  return input;
};
