let LEVEL = 'easy';

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
  return raund.textContent.split(' ')[1];
}

export { setLevel, getRaund, LEVEL };
