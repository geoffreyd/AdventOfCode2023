import _ from "lodash-es";
import { row } from 'mathjs';

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n").map(row => row.split(""));

  return input;
};
