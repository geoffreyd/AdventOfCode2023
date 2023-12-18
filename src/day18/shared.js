import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n").map(line => {

    const [direction, dis, color] = line.split(" ");

    return {
      direction,
      distance: parseInt(dis),
      color
    }
  });


  return input;
};
