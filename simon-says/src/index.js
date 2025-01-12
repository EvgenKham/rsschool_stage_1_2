import renderPopup from './renderPopup.js';
import renderStartContent from './renderStartContent.js';
import { createSequence } from './createSequence.js';
import { setLevel, getRaund, LEVEL } from './settings.js';

renderPopup();
renderStartContent();

const levels = document.querySelectorAll('.level__btn');
const allBtn = document.querySelectorAll('.btn');

function startGame() {
  const popup = document.querySelector('.popup');
  const popupContent = document.querySelector('.popup__content');
  popupContent.classList.add('popup-unvisible');
  setTimeout(() => popup.classList.add('popup-hidden'), 300);
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));
  createSequence(LEVEL, getRaund());
}

[...levels].forEach((item) => {
  item.children[0].addEventListener('click', setLevel);
});

const start = document.querySelector('.btn_start');
start.addEventListener('click', startGame);
