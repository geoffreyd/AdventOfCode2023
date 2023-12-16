import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n").map(line => {
    const chars = [];
    for (let i = 0; i < line.length; i++) {
      chars.push(line.charAt(i));
    }
    return chars
  });


  return input;
};
