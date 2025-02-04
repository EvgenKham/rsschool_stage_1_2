import { PUZZLES } from './dataPuzzle.js';
import { saveTimer } from './timer.js';
import { createGameBox } from './renderMainContent.js';

let defaultIdPuzzle = 1;

function checkSolve(puzzle = PUZZLES[defaultIdPuzzle - 1]) {
  const fieldGame = document.querySelector('.field-game');

  for (let i = 0; i < puzzle.size; i++) {
    const rowField = [...fieldGame.children][i];
    for (let j = 0; j < puzzle.size; j++) {
      const cellField = [...rowField.children][j];
      const cellPuzzle = puzzle.data[i][j];
      const isFilledField = cellField.classList.contains('cell_fill');

      if (cellPuzzle === 1 && isFilledField) {
        continue;
      } else if (cellPuzzle === 0 && !isFilledField) {
        continue;
      } else {
        return false;
      }
    }
  }

  return true;
}

function showPopup(popup) {
  popup.classList.remove('popup-hidden');
  const content = popup.firstChild.firstChild;
  content.classList.remove('popup-unvisible');
}

function hidePopup(popup) {
  setTimeout(() => {
    popup.classList.add('popup-hidden');
  }, 300);
  const content = popup.firstChild.firstChild;
  content.classList.add('popup-unvisible');
}

function chooseLevel(event) {
  const level = event.target.parentElement.classList[1];
  console.log(level);

  const puzzleBlock = document.querySelector('.puzzle');
  switch (level) {
    case 'easy':
      [...puzzleBlock.children][0].classList.remove('puzzle__hidden');
      [...puzzleBlock.children][1].classList.add('puzzle__hidden');
      [...puzzleBlock.children][2].classList.add('puzzle__hidden');
      defaultIdPuzzle = 1;
      break;
    case 'medium':
      [...puzzleBlock.children][0].classList.add('puzzle__hidden');
      [...puzzleBlock.children][1].classList.remove('puzzle__hidden');
      [...puzzleBlock.children][2].classList.add('puzzle__hidden');
      defaultIdPuzzle = 6;
      break;
    case 'hard':
      [...puzzleBlock.children][0].classList.add('puzzle__hidden');
      [...puzzleBlock.children][1].classList.add('puzzle__hidden');
      [...puzzleBlock.children][2].classList.remove('puzzle__hidden');
      defaultIdPuzzle = 11;
      break;
  }
  console.log(defaultIdPuzzle);
}

function choosePuzzle(event) {
  defaultIdPuzzle = event.target.value;
  console.log(defaultIdPuzzle);
}

function getRandomId() {
  const count = PUZZLES.length;
  const id = Math.floor(Math.random() * count);
  defaultIdPuzzle = id + 1;
  return id;
}

function cleanGameField() {
  const allFieldCells = document.querySelectorAll('.cell_field');
  [...allFieldCells].forEach((cell) => {
    cell.classList.remove('cell_fill', 'cell_cross');
  });
}

function saveGame() {
  const allFieldCells = document.querySelectorAll('.cell_field');

  //0 - empty, 1 - filled, 2 - crossed
  const saveGameField = [];
  [...allFieldCells].forEach((cell) => {
    if (cell.classList.contains('cell_fill')) {
      saveGameField.push(1);
    } else if (cell.classList.contains('cell_cross')) {
      saveGameField.push(2);
    } else {
      saveGameField.push(0);
    }
  });

  const time = saveTimer();

  //Save state of game field, time and id puzzle
  localStorage.setItem('savedFieldGame', JSON.stringify(saveGameField));
  localStorage.setItem('savedTime', time);
  localStorage.setItem('savedIdPuzzle', defaultIdPuzzle);

  const continueBtn = document.querySelector('.options__continue');
  continueBtn.classList.remove('btn__disable');
}

function getSavedGame() {
  const savedGameField = JSON.parse(localStorage.getItem('savedFieldGame'));
  const savedTime = localStorage.getItem('savedTime');
  const savedIdPuzzle = localStorage.getItem('savedIdPuzzle');

  const main = document.querySelector('.main');
  const fieldGame = [...main.children][1];
  fieldGame.replaceWith(createGameBox(PUZZLES[savedIdPuzzle - 1]));
  const allFieldCells = document.querySelectorAll('.cell_field');

  [...allFieldCells].forEach((cell, index) => {
    if (savedGameField[index] === 1) {
      cell.classList.add('cell_fill');
    }
    if (savedGameField[index] === 2) {
      cell.classList.add('cell_cross');
    }
  });

  return savedTime;
}

export {
  checkSolve,
  showPopup,
  hidePopup,
  chooseLevel,
  choosePuzzle,
  getRandomId,
  cleanGameField,
  saveGame,
  getSavedGame,
  defaultIdPuzzle,
};
