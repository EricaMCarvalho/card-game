const suits = ['HEARTS', 'CLUBS', 'SPADES', 'DIAMONDS'];
const values = [
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

const getShuffledDeck = () => {
  const allCards = [];

  for (let suit of suits) {
    for (let value of values) {
      let card = {
        suit,
        value,
        code: value + suit[0],
      };

      allCards.push(card);
    }
  }

  // Durstenfeld shuffle (in-place)
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  const shuffledDeck = shuffle(allCards);

  return shuffledDeck;
};

module.exports = getShuffledDeck;
