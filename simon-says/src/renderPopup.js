export default function renderPopup() {
  const body = document.body;
  const popup = document.createElement('div');
  popup.classList.add('popup', 'popup-hidden');

  const container = document.createElement('div');
  container.classList.add('popup__container');

  const content = document.createElement('div');
  content.classList.add('popup__content', 'popup-unvisible');

  const headliner = document.createElement('p');
  headliner.classList.add('headline');
  headliner.textContent = 'Choose level';

  const levelBlock = document.createElement('div');
  levelBlock.classList.add('level');

  const COUNT_LEVEL = 3;
  const LEVELS = [
    ['level-easy', true, 'easy'],
    ['level-medium', false, 'medium'],
    ['level-hard', false, 'hard'],
  ];

  for (let i = 0; i < COUNT_LEVEL; i++) {
    const levelBtn = document.createElement('div');
    levelBtn.classList.add('level__btn');

    const input = createInput(LEVELS[i][0], LEVELS[i][1], LEVELS[i][2]);
    const label = createLabel(LEVELS[i][0], LEVELS[i][2]);

    levelBtn.append(input, label);
    levelBlock.append(levelBtn);
  }

  const buttonStr = document.createElement('button');
  buttonStr.classList.add('btn', 'btn_start');
  buttonStr.textContent = 'Start';

  levelBlock.append(buttonStr);
  content.append(headliner, levelBlock);
  container.append(content);
  popup.append(container);
  body.append(popup);
}

function createInput(id, checked, text) {
  const input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('id', id);
  input.setAttribute('name', 'radio');
  input.setAttribute('value', text);
  input.setAttribute('checked', checked);
  return input;
}

function createLabel(id, text) {
  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = text.toUpperCase();
  return label;
}
