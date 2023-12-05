import _ from "lodash-es";

export const parseInput = (rawInput) => {
  return _(rawInput)
    .chain()
    .split("\n")
    .map(line => {
      const [card, numbers] = line.split(':')
      const [winning, have] = numbers.split("|")

      return {
        card,
        winning: _.compact(winning.split(' ')),
        have: _.compact(have.split(' '))
      }
    })
    .value()
};
