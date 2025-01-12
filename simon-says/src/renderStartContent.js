export default function renderStartContent() {
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

  const body = document.body;

  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  const header = document.createElement('h1');
  header.classList.add('header');
  header.textContent = 'Simon says';

  const settings = document.createElement('div');
  settings.classList.add('settings');

  const settingsAvailable = document.createElement('div');
  settingsAvailable.classList.add('settings__available');

  const newGame = document.createElement('div');
  newGame.classList.add('btn', 'btn_new-game');
  newGame.textContent = 'New game';
  settingsAvailable.append(newGame);

  const repeat = document.createElement('div');
  repeat.classList.add('btn', 'btn_repeat');
  repeat.textContent = 'Repeat the sequence';
  settingsAvailable.append(repeat);

  const settingsUnavailable = document.createElement('div');
  settingsUnavailable.classList.add('settings__unavailable');

  const levelDisplay = document.createElement('div');
  levelDisplay.classList.add('chosen-level');
  levelDisplay.textContent = 'Level: ';
  settingsUnavailable.append(levelDisplay);

  const RaundDisplay = document.createElement('div');
  RaundDisplay.classList.add('raund');
  RaundDisplay.textContent = 'Raund: 1 / 5 ';
  settingsUnavailable.append(RaundDisplay);

  settings.append(settingsAvailable, settingsUnavailable);

  const display = document.createElement('div');
  display.classList.add('display');

  const keyboardConainer = document.createElement('div');
  keyboardConainer.classList.add('keyboard-container');

  const keyNumbers = document.createElement('div');
  keyNumbers.classList.add('key-numbers');

  for (let i = 0; i < NUMBERS.length; i++) {
    const classes = ['btn', 'btn_number'];
    const number = createKeyBtn(classes, NUMBERS[i]);
    keyNumbers.append(number);
  }

  const keyLetters = document.createElement('div');
  keyLetters.classList.add('key-letters', 'keyboard-hidden');

  for (let i = 0; i < LETTERS.length; i++) {
    const classes = ['btn', 'btn_letter'];
    const letter = createKeyBtn(classes, LETTERS[i]);
    keyLetters.append(letter);
  }

  keyboardConainer.append(keyNumbers, keyLetters);
  wrapper.append(header, settings, display, keyboardConainer);
  body.append(wrapper);
}

function createKeyBtn(classes, text) {
  const btn = document.createElement('div');
  btn.classList.add(...classes);
  btn.textContent = text;
  return btn;
}
