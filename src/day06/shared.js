import _ from "lodash-es";

export const parseInput = (rawInput) => {
  const lines = rawInput.split("\n")

  const times = _.compact(lines[0].split(":")[1].split(' ')).map(_.parseInt)
  const distance = _.compact(lines[1].split(":")[1].split(' ')).map(_.parseInt)

  return _.zip(times, distance)
};

export const parseInput2 = (rawInput) => {
  const lines = rawInput.split("\n")

  const times = _.compact(lines[0].split(":")[1].split(' ')).join('')
  const distance = _.compact(lines[1].split(":")[1].split(' ')).join('')

  return [_.parseInt(times), _.parseInt(distance)]
};
