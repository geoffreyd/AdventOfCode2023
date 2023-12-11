import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n");


  return input.map(row => row.split(''));
};
