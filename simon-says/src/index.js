import renderPopup from './renderPopup.js';
import renderStartContent from './renderStartContent.js';
import { createSequence } from './createSequence.js';
import { setLevel, getRaund, LEVEL } from './settings.js';
import { repeatSequence, createNewGame, clickKey } from './interaction.js';

renderPopup();
renderStartContent();

const levels = document.querySelectorAll('.level__btn');
const allBtn = document.querySelectorAll('.btn');
const repeat = document.querySelector('.btn_repeat');
const newGame = document.querySelector('.btn_new-game');

function startGame() {
  const popup = document.querySelector('.popup');
  const popupContent = document.querySelector('.popup__content');
  popupContent.classList.add('popup-unvisible');
  setTimeout(() => popup.classList.add('popup-hidden'), 300);

  //Turn off all buttons on the page
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));

  createSequence(LEVEL, getRaund());
}

[...levels].forEach((item) => {
  item.children[0].addEventListener('click', setLevel);
});

clickKey();

const start = document.querySelector('.btn_start');
start.addEventListener('click', startGame);

repeat.addEventListener('click', repeatSequence);
newGame.addEventListener('click', createNewGame);
