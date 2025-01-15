import { createSequence, getSequence, simulateSequence, removeSequance } from './createSequence.js';
import { nextValueRaund, setStateMistake, LEVEL, getRaund } from './settings.js';

function repeatSequence() {
  const allBtn = document.querySelectorAll('.btn');
  const repeat = document.querySelector('.btn_repeat');

  //Clean display after animation
  const display = document.querySelector('.display');
  [...display.children].forEach((symbol) => symbol.classList.add('clean-error'));
  setTimeout(() => (display.innerHTML = ''), 700);

  //Turn off all buttons on the page
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));

  const sequence = getSequence();
  simulateSequence(sequence);

  //Turn off the button 'repeat' after repeat simulation
  const count = getSequence().length;
  setTimeout(() => repeat.classList.add('btn_disable'), 1701 + 1000 * (count - 1));

  setStateMistake(true);
}

function createNewGame() {
  //Clean old sequence
  removeSequance();

  //Clean display
  const display = document.querySelector('.display');
  display.innerHTML = '';

  const popup = document.querySelector('.popup_start');
  const popupContent = document.querySelector('.popup__content');
  popupContent.classList.toggle('popup-unvisible');
  setTimeout(() => popup.classList.toggle('popup-hidden'), 300);
}

function writeKey(key) {
  const display = document.querySelector('.display');
  const symbol = document.createElement('div');
  symbol.classList.add('display__letter');
  symbol.textContent = key;
  display.append(symbol);
}

function checkKey(key, index) {
  const sequence = getSequence();

  if (sequence[index] == key) {
    return true;
  } else {
    return false;
  }
}

function checkWin() {
  const display = document.querySelector('.display');
  const sequence = getSequence();

  if ([...display.children].length === sequence.length) {
    for (let i = 0; i < sequence.length; i++) {
      if (display.children[i].textContent == sequence[i]) {
        return true;
      }
    }
  }
  return false;
}

function winRaund() {
  const display = document.querySelector('.display');
  //Todo add class with setTimeout
  [...display.children].forEach((item) => item.classList.add('letter-win'));

  const allBtn = document.querySelectorAll('.btn');
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));

  const repeatBtn = document.querySelector('.btn_repeat');
  repeatBtn.classList.remove('btn_disable');
  repeatBtn.style.display = 'none';

  const nextRaundBtn = document.querySelector('.btn_next-raund');
  nextRaundBtn.classList.remove('btn_disable');
  nextRaundBtn.style.display = 'block';
}

function showOnlyNewGame() {
  const allBtn = document.querySelectorAll('.btn');
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));

  const newBtn = document.querySelector('.btn_new-game');
  newBtn.classList.remove('btn_disable');

  const startBtn = document.querySelector('.btn_start');
  startBtn.classList.remove('btn_disable');
}

function newRaund() {
  const allBtn = document.querySelectorAll('.btn');
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));

  const repeatBtn = document.querySelector('.btn_repeat');
  repeatBtn.style.display = 'block';

  const nextRaundBtn = document.querySelector('.btn_next-raund');
  nextRaundBtn.style.display = 'none';

  //Clean display after animation
  const display = document.querySelector('.display');
  display.innerHTML = '';

  setStateMistake(false);
  nextValueRaund();
  removeSequance();
  createSequence(LEVEL, getRaund());
}

function loseGame() {
  const popupLose = document.querySelector('.popup-lose');
  const popupLoseContent = document.querySelector('.popup-lose__content');
  popupLoseContent.classList.add('popup-unvisible');
  popupLose.classList.add('popup-hidden');

  const display = document.querySelector('.display');
  display.innerHTML = '';

  removeSequance();

  const allBtn = document.querySelectorAll('.btn');
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));

  const newBtn = document.querySelector('.btn_new-game');
  newBtn.classList.remove('btn_disable');

  const startBtn = document.querySelector('.btn_start');
  startBtn.classList.remove('btn_disable');
}

function showWinGame() {
  const display = document.querySelector('.display');
  const allBtn = document.querySelectorAll('.btn');
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));
  const newBtn = document.querySelector('.btn_new-game');
  newBtn.classList.remove('btn_disable');

  [...display.children].forEach((item, index) => {
    setTimeout(() => item.classList.add('win-game-start'), 600 + 300 * index + 300);
  });

  setTimeout(() => display.classList.add('win-game-finish'), 4000);
}

function isPopupActive() {
  const allPopups = document.querySelectorAll('.popup');
  const countPopup = allPopups.length;

  let isActive = false;

  for (let i = 0; i < countPopup; i++) {
    const popup = [...allPopups][i];
    if (!popup.classList.contains('popup-hidden')) {
      isActive = true;
      break;
    }
  }
  return isActive;
}

function isKeysDisable(container) {
  return [...container].every((btn) => btn.classList.contains('btn_disable'));
}

function isKeyboardClick() {
  const btnLetters = document.querySelectorAll('.btn_letter');
  const btnNumbers = document.querySelectorAll('.btn_number');
  const keysBtn = [...btnNumbers].concat([...btnLetters]);
  return keysBtn.some((btn) => btn.classList.contains('btn_click'));
}

export {
  repeatSequence,
  createNewGame,
  writeKey,
  checkKey,
  checkWin,
  winRaund,
  showOnlyNewGame,
  newRaund,
  showWinGame,
  loseGame,
  isPopupActive,
  isKeysDisable,
  isKeyboardClick,
};
