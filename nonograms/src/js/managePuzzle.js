import { PUZZLES } from './dataPuzzle.js';

function checkSolve(puzzle = PUZZLES[0]) {
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

function hidePopup(event) {
  const popup = event.target.closest('.popup');
  setTimeout(() => {
    popup.classList.add('popup-hidden');
  }, 300);
  const content = popup.firstChild.firstChild;
  content.classList.add('popup-unvisible');
}

export { checkSolve, showPopup, hidePopup };
