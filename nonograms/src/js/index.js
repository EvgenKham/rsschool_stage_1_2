import { PUZZLES } from './dataPuzzle.js';
import { createBackgraund, renderAllPopups, apdateTableBest } from './renderPopups.js';
import { renderStartContent, createGameBox, createHtmlElement } from './renderMainContent.js';
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
  solvePuzzle,
  saveResult,
  switchElements,
} from './managePuzzle.js';

createBackgraund();
renderAllPopups();
renderStartContent();

let turnOn = true;
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

    const isFilled = cell.classList.contains('cell_fill');
    if (isFilled) {
      if (turnOn) {
        new Audio('./assets/sounds/empty-cell.mp3').play();
      }
    } else {
      if (turnOn) {
        new Audio('./assets/sounds/fill-cell.mp3').play();
      }
    }

    cell.classList.remove('cell_cross');
    cell.classList.toggle('cell_fill');

    const isSolve = checkSolve();
    if (isSolve) {
      if (turnOn) {
        new Audio('./assets/sounds/win.mp3').play();
      }

      stopTimer();
      const time = saveTimer();
      const text = `You have solved the nonogram in ${time} seconds!`;
      const subtitle = document.querySelector('.popup__subtitle');
      subtitle.textContent = text;

      saveResult(PUZZLES[defaultIdPuzzle - 1], saveTimer());
      apdateTableBest();
      showPopup(popupWin);
      const fieldGame = document.querySelector('.field-game');
      fieldGame.classList.add('field-avoid-click');

      resetGameBtn.classList.remove('btn__disable');
      saveGameBtn.classList.add('btn__disable');
      solutionGameBtn.classList.add('btn__disable');
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

    const isCrossed = cell.classList.contains('cell_cross');
    if (isCrossed) {
      if (turnOn) {
        new Audio('./assets/sounds/empty-cell.mp3').play();
      }
    } else {
      if (turnOn) {
        new Audio('./assets/sounds/cross-cell.mp3').play();
      }
    }

    cell.classList.remove('cell_fill');
    cell.classList.toggle('cell_cross');

    const isSolve = checkSolve();
    if (isSolve) {
      if (turnOn) {
        new Audio('./assets/sounds/win.mp3').play();
      }

      stopTimer();
      const time = saveTimer();
      const text = `You have solved the nonogram in ${time} seconds!`;
      const subtitle = document.querySelector('.popup__subtitle');
      subtitle.textContent = text;

      saveResult(PUZZLES[defaultIdPuzzle - 1], saveTimer());
      apdateTableBest();
      showPopup(popupWin);
      const fieldGame = document.querySelector('.field-game');
      fieldGame.classList.add('field-avoid-click');

      resetGameBtn.classList.remove('btn__disable');
      saveGameBtn.classList.add('btn__disable');
      solutionGameBtn.classList.add('btn__disable');
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
  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }
}

function randomGame() {
  const fieldGame = [...main.children][1];
  const randomId = getRandomId();
  fieldGame.replaceWith(createGameBox(PUZZLES[randomId]));
  stopTimer();
  resetTimer();
  resetGameBtn.classList.add('btn__disable');
  saveGameBtn.classList.add('btn__disable');
  solutionGameBtn.classList.remove('btn__disable');
  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }
}

function resetGame() {
  stopTimer();
  resetTimer();
  cleanGameField();
  const fieldGame = document.querySelector('.field-game');
  fieldGame.classList.remove('field-avoid-click');
  resetGameBtn.classList.add('btn__disable');
  saveGameBtn.classList.add('btn__disable');
  solutionGameBtn.classList.remove('btn__disable');
  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }
}

function continueGame() {
  const savedTime = getSavedGame();
  stopTimer();
  resetTimer();
  setTime(savedTime);
  startTimer();
  resetGameBtn.classList.remove('btn__disable');
  saveGameBtn.classList.remove('btn__disable');
  solutionGameBtn.classList.remove('btn__disable');
  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }
}

function getSolution() {
  solvePuzzle();
  stopTimer();
  resetTimer();
  const fieldGame = document.querySelector('.field-game');
  fieldGame.classList.add('field-avoid-click');
  resetGameBtn.classList.remove('btn__disable');
  saveGameBtn.classList.add('btn__disable');
  solutionGameBtn.classList.add('btn__disable');
  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }
}

function switchSound() {
  const soundIconOff = createHtmlElement('i', ['fa', 'fa-volume-off']);
  const soundIconUp = createHtmlElement('i', ['fa', 'fa-volume-up']);
  const icon = switchSoundBtn.firstChild;

  if (icon.classList.contains('fa-volume-off')) {
    icon.remove();
    switchSoundBtn.append(soundIconUp);
    turnOn = true;
  }
  if (icon.classList.contains('fa-volume-up')) {
    new Audio('./assets/sounds/click-options.mp3').play();
    icon.remove();
    switchSoundBtn.append(soundIconOff);
    turnOn = false;
  }
}

function switchTheme() {
  const lightIcon = createHtmlElement('i', ['fa', 'fa-sun-o']);
  const darkIcon = createHtmlElement('i', ['fa', 'fa-moon-o']);
  const icon = switchThemeBtn.firstChild;

  if (icon.classList.contains('fa-sun-o')) {
    icon.remove();
    switchThemeBtn.append(darkIcon);
  }
  if (icon.classList.contains('fa-moon-o')) {
    icon.remove();
    switchThemeBtn.append(lightIcon);
  }

  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }

  switchElements();
}

main.addEventListener('click', fillCell);
main.addEventListener('contextmenu', crossCell);

const chooseGameBtn = document.querySelector('.options__choose');
const newGamePopup = document.querySelector('.popup__new-game');
chooseGameBtn.addEventListener('click', () => {
  showPopup(newGamePopup);
  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }
});

const closeWinBtn = document.querySelector('.close-win');
const winPopup = document.querySelector('.popup__win');
closeWinBtn.addEventListener('click', () => {
  hidePopup(winPopup);
  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }
});

const bestBtn = document.querySelector('.best-results');
const bestGamePopup = document.querySelector('.popup__best');
bestBtn.addEventListener('click', () => {
  showPopup(bestGamePopup);
  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }
});

const closeBestBtn = document.querySelector('.close-best');
closeBestBtn.addEventListener('click', () => {
  hidePopup(bestGamePopup);
  if (turnOn) {
    new Audio('./assets/sounds/click-options.mp3').play();
  }
});

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

const solutionGameBtn = document.querySelector('.options__solution');
solutionGameBtn.addEventListener('click', getSolution);

const switchSoundBtn = document.querySelector('.switch-sound');
switchSoundBtn.addEventListener('click', switchSound);

const switchThemeBtn = document.querySelector('.switch-theme');
switchThemeBtn.addEventListener('click', switchTheme);
