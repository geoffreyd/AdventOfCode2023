import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n");

  const instructions = input.shift();
  input.shift()
  const connection = input.map((line) => {
    const matches = line.match(/([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)/);

    return [matches[1], [matches[2], matches[3]]]
  })

  return {
    instructions,
    nodes: _.fromPairs(connection)
  }
};
