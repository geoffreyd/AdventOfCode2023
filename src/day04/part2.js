import { parseInput } from './shared.js';
import _ from "lodash-es";

const part2 = (rawInput) => {
  const cards = parseInput(rawInput);

  const cardCopies = Array.from({ length: cards.length }, () => 1);

  const maxCard = cards.length - 1

  _(cards).each((card, idx) => {
    const copies = cardCopies[idx];

    const overlap = _.intersection(card.winning, card.have).length;
    console.log("card", idx,"won", overlap, "x", copies, "times");
    _.range(1, overlap + 1).forEach(i => {
      if (cardCopies[idx + i]) {
        cardCopies[idx + i] += copies
      }
    })

  })

  console.log('copies', cardCopies);

  return _.sum(cardCopies);
};

export default part2;