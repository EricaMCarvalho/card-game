const SUITS = ['HEARTS', 'CLUBS', 'SPADES', 'DIAMONDS'];
const VALUES = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

class Deck {
  constructor(cards = getNewDeck()) {
    this.cards = cards;
  }

  // Durstenfeld shuffle (in-place)
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  deal(numPlayers) {
    const handSize = Math.floor(52 / numPlayers);
    const chunked = [];

    for (let item of this.cards) {
      const last = chunked[chunked.length - 1];
      if (last && last.length < handSize) {
        last.push(item);
      } else {
        chunked.push([item]);
      }
    }

    return chunked;
  }
}

class Card {
  constructor(suit, value) {
    (this.suit = suit), (this.value = value);
  }
}

// helper
const getNewDeck = () => {
  const newDeck = [];

  for (let suit of SUITS) {
    for (let value of VALUES) {
      let card = new Card(suit, value);

      newDeck.push(card);
    }
  }

  return newDeck;
};

module.exports = Deck;
