import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const input = rawInput.split("\n");

  return input.map(row => {
    const [springs, counts] = row.split(' ');
    return {
      springs: springs.split(''),
      counts: counts.split(',').map(_.parseInt)
    }
  });
};
