import _ from "lodash-es";

export const cardRank = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2'
].reverse()

export const handRank = {
  '5kind': 7,
  '4kind': 6,
  'fullHouse': 5,
  '3kind': 4,
  '2pair': 3,
  '1pair': 2,
  'highCard': 1,
  'none': 0
}

export const parseInput = (rawInput) => {
  return rawInput.split("\n").map(line => line.split(" "))
};
