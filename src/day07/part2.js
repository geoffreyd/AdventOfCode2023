import { parseInput } from './shared.js';
import _ from "lodash-es";
import { cardRank as cardScore } from './shared.js';

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
  '2',
].reverse()

const charSubs = _.without(cardRank, 'J');

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const ranksAndBets = input.map(player => [
    determineHand(player[0]),
    _.parseInt(player[1]),
    player[0]
  ]);
  // const sorted = _.sortBy(ranksAndBets, (player) => _.flatten(player[0]))
  const sorted = ranksAndBets.sort(sortRanks)

  sorted.forEach(i => console.log(_.flatten(i)))
  const scores = sorted.map((play, idx) => play[1] * (idx + 1))
  return _.sum(scores);
};

export default part2;

function sortRanks(playA, playB) {
  const a = _.flatten(playA[0])
  const b = _.flatten(playB[0])

  for (let i = 0; i < a.length && i < b.length; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }

  }
  return a.length - b.length;
}

function determineHand(hand) {
  // console.log('determinHand', hand);
  const allHands = handVariants(hand)

  const allTypes = allHands.map(h => [determineHandType(h, hand)])
  const sortedHands = allTypes.sort(sortRanks)
  // console.log('sorted', sortedHands)
  return sortedHands[allTypes.length - 1][0];
}

function handVariants(hand) {
  // console.log("handVariants", hand);
  const handChars = hand.split('')
  let variants = [hand];

  for (let idx = 0; idx < handChars.length; idx++) {
    const char = hand[idx];
    if (char == 'J') {
      charSubs.forEach(subChar => {
        handChars[idx] = subChar
        // console.log('new varient', handChars);
        variants.push(handChars.join(''))
        variants = variants.concat(handVariants(handChars.join('')))
      })
    }
  }
  return variants;
}

function determineHandType(hand, origHand) {
  const cards = hand.split('');
  const ranks = (origHand?.split('') ?? cards).map(c => c == 'J' ? 0 :cardRank.indexOf(c) + 2);
  const counts = _.countBy(cards);
  const countValues = _.values(counts);

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
