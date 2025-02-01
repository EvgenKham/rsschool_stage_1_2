const body = document.body;

//TODO Add name puzzles from array with data
const NAME_PUZZLES = [
  ['Fish', 'Cat', 'Landscape', 'Helicopter', 'Castle'],
  ['Ambulance', 'Mug', 'Batman', 'Bug', 'Smile'],
  ['Bomb', 'Dragon', 'Age', 'Viking', 'Map'],
];

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

//TODO Time of the last solved puzzle
const TIME = 345;

const LEVELS = ['easy', 'medium', 'hard'];

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
  const bg = document.createElement('div');
  bg.classList.add('bg-game');
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

  const paragraph = document.createElement('p');
  paragraph.classList.add('popup__title');
  paragraph.textContent = 'Choose puzzle';

  const levelBox = document.createElement('div');
  levelBox.classList.add('level');

  const puzzleBox = document.createElement('div');
  puzzleBox.classList.add('puzzle');

  let countPuzzle = 0;

  for (let i = 0; i < 3; i++) {
    const input = createBoxInput(classesLevelBox[i], ...attributes[i]);
    levelBox.append(input);

    const puzzleBlock = document.createElement('div');
    puzzleBlock.classList.add(...classesPuzzleBox[i]);

    for (let j = 0; j < 5; j++) {
      let cheched = false;
      if (j === 0) cheched = true;
      const puzzle = createBoxInput(
        ['puzzle__item'],
        `puzzle-${++countPuzzle}`,
        `puzzle-${LEVELS[i]}`,
        NAME_PUZZLES[i][j],
        NAME_PUZZLES[i][j],
        cheched,
      );
      puzzleBlock.append(puzzle);
    }

    puzzleBox.append(puzzleBlock);
  }

  const btn = document.createElement('div');
  btn.classList.add('start', 'btn');
  btn.textContent = 'Start';

  content.append(paragraph, levelBox, puzzleBox, btn);
}

function createBoxInput(classes, id, name, value, content, checked) {
  const box = document.createElement('div');
  box.classList.add(...classes);

  const input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('id', id);
  input.setAttribute('name', name);
  input.setAttribute('value', value);
  if (checked) {
    input.setAttribute('cheched', checked);
  }

  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = content;

  box.append(input, label);

  return box;
}

function renderPopupBest() {
  const popupBest = createPopupWrapper('popup__best');
  const content = popupBest.firstChild.firstChild;

  const wrapper = document.createElement('div');
  wrapper.classList.add('table__results');

  const table = document.createElement('table');

  const caption = document.createElement('caption');
  caption.textContent = 'Your best results';

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

  const btn = document.createElement('div');
  btn.classList.add('close', 'btn');
  btn.textContent = 'Ok';

  content.append(wrapper, btn);
}

function renderPopupWin() {
  const popupWin = createPopupWrapper('popup__win');
  const content = popupWin.firstChild.firstChild;

  const title = document.createElement('p');
  title.classList.add('popup__title');
  title.textContent = 'Great!';

  const subtitle = document.createElement('p');
  subtitle.classList.add('popup__subtitle');
  subtitle.textContent = `You have solved the nonogram in ${TIME} seconds!`;

  const btn = document.createElement('div');
  btn.classList.add('close', 'btn');
  btn.textContent = 'Ok';

  content.append(title, subtitle, btn);
}

function createPopupWrapper(name) {
  const popup = document.createElement('div');
  popup.classList.add('popup', name, 'popup-hidden');

  const container = document.createElement('div');
  container.classList.add('popup__container');

  const content = document.createElement('div');
  content.classList.add('popup__content', 'popup-unvisible');

  container.append(content);
  popup.append(container);
  body.append(popup);

  return popup;
}

export { createBackgraund, renderAllPopups };
