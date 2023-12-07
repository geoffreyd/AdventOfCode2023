import { parseInput } from './shared.js';
import _ from "lodash-es";
import { cardRank } from './shared.js';

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const ranksAndBets = input.map(player => [
    determineHand(player[0]),
    _.parseInt(player[1])
  ]);
  // const sorted = _.sortBy(ranksAndBets, (player) => _.flatten(player[0]))
  const sorted = ranksAndBets.sort((playA, playB) => {
    const a = _.flatten(playA[0])
    const b = _.flatten(playB[0])

    for (let i = 0; i < a.length && i < b.length; i++) {
      if (a[i] !== b[i]) {
        return a[i] - b[i];
      }

    }
    return a.length - b.length;
  })
  // sorted.forEach(i => console.log(_.flatten(i)))

  const scores = sorted.map((play, idx) => play[1] * (idx + 1))
  return _.sum(scores);
};

export default part1;

/*
Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
*/

function determineHand(hand) {
  const cards = hand.split('');
  const ranks = cards.map(c => cardRank.indexOf(c) + 2);
  const counts = _.countBy(cards);
  const countValues = _.values(counts);

  let handType;
  switch (true) {
    case countValues.includes(5):
      return [7, ranks, '5kind'] // [7, '5kind'];
    case countValues.includes(4):
      return [6, ranks, '4kind'] // [6, '4kind'];
    case countValues.includes(3) && countValues.includes(2):
      return [5, ranks, 'fullHouse'] //'fullHouse';
    case countValues.includes(3):
      return [4, ranks, '3kind'] //'3kind';
    case countValues.filter(i => i == 2).length > 1:
      return [3, ranks, '2pair'] //'2pair';
    case countValues.includes(2):
      return [2, ranks, '1pair'] // '1pair';
    case countValues.filter(i => i == 1).length >= 5:
      return [1, ranks, 'highCard'] //'highCard';
    default:
      break;
  }

  // return [countValues, counts, handType]
}
