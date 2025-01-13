import { renderSettingPopup, renderMistakePopup, renderLosePopup } from './renderPopup.js';
import renderStartContent from './renderStartContent.js';
import { createSequence, getSequence } from './createSequence.js';
import {
  setLevel,
  getRaund,
  resetRaund,
  setStateMistake,
  LEVEL,
  getStateMistake,
} from './settings.js';
import {
  repeatSequence,
  createNewGame,
  writeKey,
  checkKey,
  checkWin,
  loseGame,
  winRaund,
  newRaund,
  showWinGame,
} from './interaction.js';

renderSettingPopup();
renderMistakePopup();
renderLosePopup();
renderStartContent();

const levels = document.querySelectorAll('.level__btn');
const allBtn = document.querySelectorAll('.btn');
const keyboard = document.querySelector('.keyboard-container');
const display = document.querySelector('.display');
const popupMistake = document.querySelector('.popup-mistake');
const popupMistakeContent = document.querySelector('.popup-mistake__content');
const popupLose = document.querySelector('.popup-lose');
const popupLoseContent = document.querySelector('.popup-lose__content');
// eslint-disable-next-line no-unused-vars
let MISTAKE = false;

function startGame() {
  const popup = document.querySelector('.popup_start');
  const popupContent = document.querySelector('.popup__content');
  popupContent.classList.add('popup-unvisible');
  setTimeout(() => popup.classList.add('popup-hidden'), 300);

  //Turn off all buttons on the page
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));

  resetRaund();
  createSequence(LEVEL, getRaund());
  setStateMistake(false);
}

function continueGame() {
  const popupMistake = document.querySelector('.popup-mistake');
  const popupContent = document.querySelector('.popup-mistake__content');
  popupContent.classList.add('popup-unvisible');
  setTimeout(() => popupMistake.classList.add('popup-hidden'), 300);

  setStateMistake(true);

  [...allBtn].forEach((btn) => btn.classList.remove('btn_disable'));

  const display = document.querySelector('.display');
  //Add animation remove
  [...display.children].forEach((symbol) => symbol.classList.add('clean-error'));
  //Clean display after animation
  setTimeout(() => (display.innerHTML = ''), 700);
}

[...levels].forEach((item) => {
  item.children[0].addEventListener('click', setLevel);
});

//TODO rewrite function acording DRY
keyboard.addEventListener('click', (event) => {
  const btn = event.target;
  if (btn.classList.contains('btn')) {
    const symbol = btn.textContent;
    // console.log(symbol);

    //Add effect button click
    btn.classList.add('btn_click');
    setTimeout(() => btn.classList.remove('btn_click'), 100);

    const sequence = getSequence();

    if ([...display.children].length < sequence.length) {
      const index = [...display.children].length;

      //If correct symbol / Right block
      if (checkKey(symbol, index)) {
        writeKey(symbol);

        if (checkWin()) {
          console.log('Win Raund!');

          if (getRaund() < 5) {
            winRaund();
          } else {
            console.log('You win the game!');
            [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));
            showWinGame();
            const startBtn = document.querySelector('.btn_start');
            startBtn.classList.remove('btn_disable');
          }
        }
        //If incorrect symbol / Mistake block
      } else {
        writeKey(symbol);
        btn.classList.add('key-error');
        display.children[index].classList.add('letter-error');
        setTimeout(() => btn.classList.remove('key-error'), 600);

        const allBtn = document.querySelectorAll('.btn');
        [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));

        const startBtn = document.querySelector('.btn_start');
        startBtn.classList.remove('btn_disable');

        if (!getStateMistake()) {
          const continueBtn = document.querySelector('.btn_continue');
          continueBtn.classList.remove('btn_disable');
          setTimeout(() => popupMistakeContent.classList.toggle('popup-unvisible'), 400);
          setTimeout(() => popupMistake.classList.toggle('popup-hidden'), 800);
        } else {
          const okBtn = document.querySelector('.btn_ok');
          okBtn.classList.remove('btn_disable');
          setTimeout(() => popupLoseContent.classList.remove('popup-unvisible'), 400);
          setTimeout(() => popupLose.classList.remove('popup-hidden'), 800);
        }
      }
    }
  }
});

//Todo work with physical keyboard
// document.addEventListener('keydown', (event) => {
//   console.log(event.code);
// });

const startBtn = document.querySelector('.btn_start');
startBtn.addEventListener('click', startGame);

const repeat = document.querySelector('.btn_repeat');
repeat.addEventListener('click', repeatSequence);

const newGame = document.querySelector('.btn_new-game');
newGame.addEventListener('click', createNewGame);

const continueBtn = document.querySelector('.btn_continue');
continueBtn.addEventListener('click', continueGame);

const loseBtn = document.querySelector('.btn_ok');
loseBtn.addEventListener('click', loseGame);

const nextValueRaundBtn = document.querySelector('.btn_next-raund');
nextValueRaundBtn.addEventListener('click', newRaund);
