import { PUZZLES } from './dataPuzzle.js';

// let defaultLevel = 'easy';
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
  // const popup = event.target.closest('.popup');
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
      // defaultLevel = 'easy;';
      defaultIdPuzzle = 1;
      break;
    case 'medium':
      [...puzzleBlock.children][0].classList.add('puzzle__hidden');
      [...puzzleBlock.children][1].classList.remove('puzzle__hidden');
      [...puzzleBlock.children][2].classList.add('puzzle__hidden');
      // defaultLevel = 'medium;';
      defaultIdPuzzle = 6;
      break;
    case 'hard':
      [...puzzleBlock.children][0].classList.add('puzzle__hidden');
      [...puzzleBlock.children][1].classList.add('puzzle__hidden');
      [...puzzleBlock.children][2].classList.remove('puzzle__hidden');
      // defaultLevel = 'hard';
      defaultIdPuzzle = 11;
      break;
  }
  console.log(defaultIdPuzzle);
}

function choosePuzzle(event) {
  defaultIdPuzzle = event.target.value;
  console.log(defaultIdPuzzle);
}

// function getCheckedPuzzle() {
//   const levels = document.querySelectorAll();
// }

export { checkSolve, showPopup, hidePopup, chooseLevel, choosePuzzle, defaultIdPuzzle };
