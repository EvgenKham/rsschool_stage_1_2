import { PUZZLES } from './dataPuzzle.js';

const body = document.body;

//TODO Results download from Locale Storage
const BEST_RESULTS = [
  {
    id: 1,
    puzzleName: 'Mug',
    level: 'Medium',
    time: 125,
  },
  {
    id: 2,
    puzzleName: 'Viking',
    level: 'Hard',
    time: 425,
  },
];

const HEAD_TABLE = ['#', 'Template', 'Level', 'Time'];

const classesLevelBox = [
  ['level__btn', 'easy'],
  ['level__btn', 'medium'],
  ['level__btn', 'hard'],
];

const attributes = [
  ['level-easy', 'radio-level', 'easy', '5 x 5', true],
  ['level-medium', 'radio-level', 'medium', '10 x 10', false],
  ['level-hard', 'radio-level', 'hard', '15 x 15', false],
];

const classesPuzzleBox = [
  ['puzzle__easy', 'puzzle__block'],
  ['puzzle__medium', 'puzzle__block', 'puzzle__hidden'],
  ['puzzle__hard', 'puzzle__block', 'puzzle__hidden'],
];

function createBackgraund() {
  const bg = createHtmlElement('div', ['bg-game']);
  body.append(bg);
}

function renderAllPopups() {
  renderPopupNewGame();
  renderPopupBest();
  renderPopupWin();
}

function renderPopupNewGame() {
  const popupNew = createPopupWrapper('popup__new-game');
  const content = popupNew.firstChild.firstChild;
  const paragraph = createHtmlElement('p', ['popup__title'], 'Choose puzzle');
  const levelBox = createHtmlElement('div', ['level']);
  const puzzleBox = createHtmlElement('div', ['puzzle']);

  let countPuzzle = 0;

  for (let i = 0; i < 3; i++) {
    const input = createBoxInput(classesLevelBox[i], ...attributes[i]);
    levelBox.append(input);

    const puzzleBlock = createHtmlElement('div', [...classesPuzzleBox[i]]);

    for (let j = 0; j < 5; j++) {
      let cheched = false;
      if (j === 0) cheched = true;

      const puzzle = createBoxInput(
        ['puzzle__item'],
        `puzzle-${PUZZLES[countPuzzle].id}`,
        `puzzle-${PUZZLES[countPuzzle].level}`,
        PUZZLES[countPuzzle].id,
        PUZZLES[countPuzzle].name,
        cheched,
      );
      countPuzzle++;
      puzzleBlock.append(puzzle);
    }

    puzzleBox.append(puzzleBlock);
  }

  const btn = createHtmlElement('div', ['start', 'btn'], 'Start');

  content.append(paragraph, levelBox, puzzleBox, btn);
}

function createBoxInput(classes, id, name, value, content, checked) {
  const box = createHtmlElement('div', [...classes]);

  const input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('id', id);
  input.setAttribute('name', name);
  input.setAttribute('value', value);
  if (checked) {
    input.setAttribute('checked', checked);
  }

  const label = createHtmlElement('label', [], content);
  label.setAttribute('for', id);

  box.append(input, label);

  return box;
}

function renderPopupBest() {
  const popupBest = createPopupWrapper('popup__best');
  const content = popupBest.firstChild.firstChild;
  const wrapper = createHtmlElement('div', ['table__results']);
  const table = document.createElement('table');
  const caption = createHtmlElement('caption', [], 'Your best results');
  const tableHead = document.createElement('thead');
  const headRow = document.createElement('tr');

  for (let i = 0; i < 4; i++) {
    const headCell = document.createElement('th');
    headCell.textContent = HEAD_TABLE[i];
    headRow.append(headCell);
  }

  tableHead.append(headRow);

  const tableBody = document.createElement('tbody');

  for (let i = 0; i < BEST_RESULTS.length; i++) {
    const bodyRow = document.createElement('tr');

    for (let value of Object.values(BEST_RESULTS[i])) {
      const bodyCell = document.createElement('td');
      bodyCell.textContent = value;
      bodyRow.append(bodyCell);
    }

    tableBody.append(bodyRow);
  }

  table.append(caption, tableHead, tableBody);
  wrapper.append(table);
  const btn = createHtmlElement('div', ['close-best', 'btn'], 'Ok');
  content.append(wrapper, btn);
}

function renderPopupWin() {
  const popupWin = createPopupWrapper('popup__win');
  const content = popupWin.firstChild.firstChild;
  const title = createHtmlElement('p', ['popup__title'], 'Great!');
  const text = `You have solved the nonogram in 0 seconds!`;
  const subtitle = createHtmlElement('p', ['popup__subtitle'], text);
  const btn = createHtmlElement('div', ['close-win', 'btn'], 'Ok');

  content.append(title, subtitle, btn);
}

function createPopupWrapper(name) {
  const popup = createHtmlElement('div', ['popup', name, 'popup-hidden']);
  const container = createHtmlElement('div', ['popup__container']);
  const content = createHtmlElement('div', ['popup__content', 'popup-unvisible']);
  container.append(content);
  popup.append(container);
  body.append(popup);

  return popup;
}

function createHtmlElement(tag, classes = [], text = '') {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  element.textContent = text;
  return element;
}

export { createBackgraund, renderAllPopups };
