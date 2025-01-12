const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const LETTERS = [
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
];

function createSequence(level, raund) {
  let seq = undefined;

  switch (level) {
    case 'easy':
      seq = getSequence(NUMBERS, raund);
      break;
    case 'medium':
      seq = getSequence(LETTERS, raund);
      break;
    case 'hard':
      seq = getSequence(NUMBERS.concat(LETTERS), raund);
      break;
  }
  console.log(seq);
  simulateSequence(seq, level);
}

function getSequence(symbols, raund) {
  const sequence = [];
  for (let i = 0; i < raund * 2; i++) {
    const index = Math.floor(Math.random() * symbols.length);
    sequence.push(symbols[index]);
  }
  return sequence;
}

function simulateSequence(sequence) {
  const numbersBtn = document.querySelectorAll('.btn_number');
  const lettersBtn = document.querySelectorAll('.btn_letter');
  const allBtn = document.querySelectorAll('.btn');

  sequence.forEach((symbol, index) => {
    [...numbersBtn].forEach((btn) => {
      if (btn.textContent == symbol) {
        setTimeout(() => btn.classList.add('simulate'), 1000 + 1000 * index);
        setTimeout(() => btn.classList.remove('simulate'), 1700 + 1000 * index);
      }
    });

    [...lettersBtn].forEach((btn) => {
      if (btn.textContent == symbol) {
        setTimeout(() => btn.classList.add('simulate'), 1000 + 1000 * index);
        setTimeout(() => btn.classList.remove('simulate'), 1700 + 1000 * index);
      }
    });
  });

  setTimeout(
    () => {
      [...allBtn].forEach((btn) => btn.classList.remove('btn_disable'));
    },
    1700 + 1000 * (sequence.length - 1),
  );
}

export { createSequence };
