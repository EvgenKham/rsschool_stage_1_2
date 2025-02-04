import { PUZZLES } from './dataPuzzle.js';

const body = document.body;

function renderStartContent() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');

  wrapper.append(renderHeaderSection());
  wrapper.append(renderMainSection());

  body.append(wrapper);
}

function renderHeaderSection() {
  const header = createHtmlElement('div', ['header']);

  const logoContainer = createHtmlElement('div', ['logo__container']);

  const image = createHtmlElement('img', ['logo__image']);
  image.setAttribute('src', 'assets/images/logo.png');
  image.setAttribute('alt', 'logo-puzzle');

  const headline = createHtmlElement('h1', ['logo__text'], 'Nonograms');

  logoContainer.append(image, headline);

  const settingContainer = createHtmlElement('div', ['settings']);

  const bestBox = createHtmlElement('div', ['best-results', 'settings__icon']);
  const bestIcon = createHtmlElement('i', ['fa', 'fa-flag-checkered']);
  bestBox.append(bestIcon);

  const themeBox = createHtmlElement('div', ['switch-theme', 'settings__icon']);
  const themeIcon = createHtmlElement('i', ['fa', 'fa-sun-o']);
  // const themeIcon = createHtmlElement('i', ['fa', 'fa-moon-o']);
  themeBox.append(themeIcon);

  const soundBox = createHtmlElement('div', ['switch-sound', 'settings__icon']);
  const soundIcon = createHtmlElement('i', ['fa', 'fa-volume-up']);
  // const soundIcon = createHtmlElement('i', ['fa', 'fa-volume-off']);
  soundBox.append(soundIcon);

  settingContainer.append(bestBox, themeBox, soundBox);

  header.append(logoContainer, settingContainer);

  return header;
}

function renderMainSection() {
  const main = createHtmlElement('div', ['main']);

  const timer = createHtmlElement('div', ['timer'], '00 : 00');

  const options = createHtmlElement('div', ['options']);

  const choose = createHtmlElement('div', ['options__choose', 'btn'], 'New game');
  const random = createHtmlElement('div', ['options__random', 'btn'], 'Random game');
  const solution = createHtmlElement('div', ['options__solution', 'btn'], 'Solution');
  const reset = createHtmlElement('div', ['options__reset', 'btn', 'btn__disable'], 'Reset game');
  const save = createHtmlElement('div', ['options__save', 'btn', 'btn__disable'], 'Save game');

  const continueBtnClasses = ['options__continue', 'btn', 'btn__disable'];

  //If there is the saved game in localStorage, the continue button  is available
  if (localStorage.getItem('savedFieldGame')) {
    continueBtnClasses.pop();
  }

  const cont = createHtmlElement('div', continueBtnClasses, 'Continue saved game');

  options.append(choose, random, solution, reset, save, cont);

  main.append(timer, createGameBox(), options);

  return main;
}

function createGameBox(puzzle = PUZZLES[0]) {
  const gameBox = createHtmlElement('div', ['table-game']);

  const freeSpace = createHtmlElement('div', ['free-space']);
  const horizontClue = createHtmlElement('div', ['horizont-clue']);
  const verticalClue = createHtmlElement('div', ['vertical-clue']);
  const fieldGame = createHtmlElement('div', ['field-game']);

  const [horizontClues, verticalClues] = getClues(puzzle);

  let maxVerticalCells = verticalClues[0].length;
  let maxHorizontCells = horizontClues[0].length;

  for (let i = 0; i < puzzle.size; i++) {
    const column = createHtmlElement('div', ['vertical-clue__column']);
    for (let j = 0; j < maxVerticalCells; j++) {
      let text = '';
      if (verticalClues[i][j] !== 0) {
        text = verticalClues[i][j];
      }
      const cell = createHtmlElement('div', ['cell_clue-vertical', 'cell'], text);
      column.append(cell);
    }
    verticalClue.append(column);
  }

  for (let i = 0; i < puzzle.size; i++) {
    const row = createHtmlElement('div', ['horizont-clue__row']);
    for (let j = 0; j < maxHorizontCells; j++) {
      let text = '';
      if (horizontClues[i][j] !== 0) {
        text = horizontClues[i][j];
      }
      const cell = createHtmlElement('div', ['cell_clue-horizont', 'cell'], text);
      row.append(cell);
    }
    horizontClue.append(row);
  }

  for (let i = 0; i < puzzle.size; i++) {
    const row = createHtmlElement('div', ['field-game__row']);
    for (let j = 0; j < puzzle.size; j++) {
      const cell = createHtmlElement('div', ['cell_field', 'cell']);
      row.append(cell);
    }
    fieldGame.append(row);
  }

  gameBox.append(freeSpace, horizontClue, verticalClue, fieldGame);

  return gameBox;
}

function getClues(puzzle) {
  const rotateDate = [];
  for (let i = 0; i < puzzle.size; i++) {
    const row = [];
    for (let j = 0; j < puzzle.size; j++) {
      row.push(puzzle.data[j][i]);
    }
    rotateDate.push(row);
  }

  const verticalClues = getArrayClues(puzzle.data, puzzle.size);
  const horizontClues = getArrayClues(rotateDate, puzzle.size);

  let maxVerticalCells = Math.max(...verticalClues.map((arr) => arr.length));
  let maxHorizontCells = Math.max(...horizontClues.map((arr) => arr.length));

  const fullVerticalClues = fullZero(verticalClues, maxVerticalCells);
  const fullhorizontClues = fullZero(horizontClues, maxHorizontCells);

  return [fullVerticalClues, fullhorizontClues];
}

function getArrayClues(arr, size) {
  const arrClues = [];
  for (let i = 0; i < size; i++) {
    const rowClues = [];
    let clue = 0;

    for (let j = 0; j < size; j++) {
      let value = arr[i][j];

      if (value === 1) {
        clue++;
        let nextId = j + 1;
        let nextValue = undefined;

        if (nextId < size) {
          nextValue = arr[i][nextId];
        }
        if (nextId >= size) {
          rowClues.push(clue);
          break;
        }
        if (nextValue === 0) {
          rowClues.push(clue);
          clue = 0;
        }
      }
    }
    arrClues.push(rowClues);
  }
  return arrClues;
}

function fullZero(clues, max) {
  clues.forEach((arr) => {
    if (arr.length < max) {
      let countZero = max - arr.length;
      for (let i = 0; i < countZero; i++) {
        arr.unshift(0);
      }
    }
  });
  return clues;
}

function createHtmlElement(tag, classes, text = '') {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = text;
  return element;
}

export { renderStartContent, createGameBox };
