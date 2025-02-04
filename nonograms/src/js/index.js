import { PUZZLES } from './dataPuzzle.js';
import { createBackgraund, renderAllPopups } from './renderPopups.js';
import { renderStartContent, createGameBox } from './renderMainContent.js';
import { startTimer, stopTimer, saveTimer, resetTimer, stateTimer, setTime } from './timer.js';
import {
  checkSolve,
  showPopup,
  hidePopup,
  chooseLevel,
  choosePuzzle,
  getRandomId,
  cleanGameField,
  defaultIdPuzzle,
  saveGame,
  getSavedGame,
} from './managePuzzle.js';

createBackgraund();
renderAllPopups();
renderStartContent();

const popupWin = document.querySelector('.popup__win');
const main = document.querySelector('.main');

function fillCell(event) {
  const cell = event.target;
  if (cell.classList.contains('cell_field')) {
    if (!stateTimer) {
      startTimer();
      resetGameBtn.classList.remove('btn__disable');
      saveGameBtn.classList.remove('btn__disable');
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
      const fieldGame = document.querySelector('.field-game');
      fieldGame.classList.add('field-avoid-click');
    }
  }
}

function crossCell(event) {
  event.preventDefault();
  const cell = event.target;
  if (cell.classList.contains('cell_field')) {
    if (!stateTimer) {
      startTimer();
      resetGameBtn.classList.remove('btn__disable');
      saveGameBtn.classList.remove('btn__disable');
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
      const fieldGame = document.querySelector('.field-game');
      fieldGame.classList.add('field-avoid-click');
    }
  }
}

function buildNewGame() {
  hidePopup(newGamePopup);
  const fieldGame = [...main.children][1];
  fieldGame.replaceWith(createGameBox(PUZZLES[defaultIdPuzzle - 1]));
  stopTimer();
  resetTimer();
  resetGameBtn.classList.add('btn__disable');
  saveGameBtn.classList.add('btn__disable');
}

function randomGame() {
  const fieldGame = [...main.children][1];
  const randomId = getRandomId();
  fieldGame.replaceWith(createGameBox(PUZZLES[randomId]));
  stopTimer();
  resetTimer();
  resetGameBtn.classList.add('btn__disable');
  saveGameBtn.classList.add('btn__disable');
}

function resetGame() {
  stopTimer();
  resetTimer();
  cleanGameField();
}

function continueGame() {
  const savedTime = getSavedGame();
  stopTimer();
  resetTimer();
  setTime(savedTime);
  startTimer();
}

main.addEventListener('click', fillCell);
main.addEventListener('contextmenu', crossCell);

const closeWin = document.querySelector('.close-win');
const winPopup = document.querySelector('.popup__win');
closeWin.addEventListener('click', () => hidePopup(winPopup));

const chooseGameBtn = document.querySelector('.options__choose');
const newGamePopup = document.querySelector('.popup__new-game');
chooseGameBtn.addEventListener('click', () => showPopup(newGamePopup));

const levelBlock = document.querySelector('.level');
levelBlock.addEventListener('click', chooseLevel);

const puzzleBlock = document.querySelector('.puzzle');
puzzleBlock.addEventListener('click', choosePuzzle);

const startBtn = document.querySelector('.start');
startBtn.addEventListener('click', buildNewGame);

const randomGameBtn = document.querySelector('.options__random');
randomGameBtn.addEventListener('click', randomGame);

const resetGameBtn = document.querySelector('.options__reset');
resetGameBtn.addEventListener('click', resetGame);

const saveGameBtn = document.querySelector('.options__save');
saveGameBtn.addEventListener('click', saveGame);

const continueGameBtn = document.querySelector('.options__continue');
continueGameBtn.addEventListener('click', continueGame);
