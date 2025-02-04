import { createBackgraund, renderAllPopups } from './renderPopups.js';
import { renderStartContent } from './renderMainContent.js';
import { startTimer, stopTimer, saveTimer, resetTimer, stateTimer } from './timer.js';
import { checkSolve, showPopup, hidePopup, chooseLevel } from './managePuzzle.js';

createBackgraund();
renderAllPopups();
renderStartContent();

const popupWin = document.querySelector('.popup__win');

function fillCell(event) {
  const cell = event.target;
  if (cell.classList.contains('cell_field')) {
    if (!stateTimer) {
      startTimer();
    }

    cell.classList.remove('cell_cross');
    cell.classList.toggle('cell_fill');

    const isSolve = checkSolve();
    if (isSolve) {
      stopTimer();
      const time = saveTimer();
      const text = `You have solved the nonogram in ${time} seconds!`;
      const subtitle = document.querySelector('.popup__subtitle');
      subtitle.textContent = text;

      showPopup(popupWin);
    }
  }
}

function crossCell(event) {
  event.preventDefault();
  const cell = event.target;
  if (cell.classList.contains('cell_field')) {
    if (!stateTimer) {
      startTimer();
    }

    cell.classList.remove('cell_fill');
    cell.classList.toggle('cell_cross');

    const isSolve = checkSolve();
    if (isSolve) {
      stopTimer();
      const time = saveTimer();
      const text = `You have solved the nonogram in ${time} seconds!`;
      const subtitle = document.querySelector('.popup__subtitle');
      subtitle.textContent = text;

      showPopup(popupWin);
    }
  }
}

const fieldGame = document.querySelector('.field-game');
fieldGame.addEventListener('click', fillCell);
fieldGame.addEventListener('contextmenu', crossCell);

const closeWin = document.querySelector('.close-win');
closeWin.addEventListener('click', hidePopup);

const chooseGameBtn = document.querySelector('.options__choose');
const newGamePopup = document.querySelector('.popup__new-game');
chooseGameBtn.addEventListener('click', () => showPopup(newGamePopup));

const levelBox = document.querySelector('.level');
levelBox.addEventListener('click', chooseLevel);
