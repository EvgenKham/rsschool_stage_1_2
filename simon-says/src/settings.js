let LEVEL = 'easy';
let MISTAKE = false;

function setLevel(event) {
  const keyboard = document.querySelector('.keyboard-container');
  const displayLevel = document.querySelector('.chosen-level');

  const keyNumbers = keyboard.children[0];
  const keyLetters = keyboard.children[1];

  const choice = event.currentTarget.getAttribute('value');
  displayLevel.textContent = `Level: ${choice}`;
  LEVEL = choice;

  switch (choice) {
    case 'easy':
      keyNumbers.classList.remove('keyboard-hidden');
      keyLetters.classList.add('keyboard-hidden');
      break;
    case 'medium':
      keyNumbers.classList.add('keyboard-hidden');
      keyLetters.classList.remove('keyboard-hidden');
      break;
    case 'hard':
      keyNumbers.classList.remove('keyboard-hidden');
      keyLetters.classList.remove('keyboard-hidden');
      break;
  }
}

function getRaund() {
  const raund = document.querySelector('.raund');
  return Number(raund.textContent.split(' ')[1]);
}

function resetRaund() {
  const raund = document.querySelector('.raund');
  raund.textContent = 'Raund: 1 / 5';
}

function nextValueRaund() {
  const raund = document.querySelector('.raund');
  let value = Number(raund.textContent.split(' ')[1]);
  value += 1;
  raund.textContent = `Raund: ${value} / 5`;
}

function getStateMistake() {
  return MISTAKE;
}

function setStateMistake(state) {
  MISTAKE = state;
}

// function changeStateMistake() {
//   if (MISTAKE) {
//     MISTAKE = false;
//   } else {
//     MISTAKE = true;
//   }
// }

export { setLevel, getRaund, nextValueRaund, resetRaund, getStateMistake, setStateMistake, LEVEL };
