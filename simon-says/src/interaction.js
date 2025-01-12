import { getSequence, simulateSequence } from './createSequence.js';

function repeatSequence() {
  const allBtn = document.querySelectorAll('.btn');
  const repeat = document.querySelector('.btn_repeat');

  //Clean display
  const display = document.querySelector('.display');
  display.innerHTML = '';

  //Turn off all buttons on the page
  [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));

  const sequence = getSequence();
  simulateSequence(sequence);

  //Turn off the button 'repeat' after first simulation
  const count = getSequence().length;
  setTimeout(() => repeat.classList.add('btn_disable'), 1701 + 1000 * (count - 1));
}

function createNewGame() {
  //Clean old sequence
  let seq = getSequence();
  seq.splice(0, seq.length);

  //Clean display
  const display = document.querySelector('.display');
  display.innerHTML = '';

  const popup = document.querySelector('.popup');
  const popupContent = document.querySelector('.popup__content');
  popupContent.classList.toggle('popup-unvisible');
  setTimeout(() => popup.classList.toggle('popup-hidden'), 300);
}

function clickKey() {
  const keyboard = document.querySelector('.keyboard-container');
  const display = document.querySelector('.display');
  const allBtn = document.querySelectorAll('.btn');

  keyboard.addEventListener('click', (event) => {
    const btn = event.target;
    if (btn.classList.contains('btn')) {
      const symbol = btn.textContent;
      console.log(symbol);
      btn.classList.add('btn_click');
      setTimeout(() => btn.classList.remove('btn_click'), 100);

      const sequence = getSequence();

      if ([...display.children].length < sequence.length) {
        const index = [...display.children].length;

        if (checkKey(symbol, index)) {
          writeKey(symbol);

          console.log(checkWin());

          if (checkWin()) {
            console.log('win!');
            [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));
            //Todo animation win
            showWin();
          }
        } else {
          //Todo block when mistake
          writeKey(symbol);
          btn.classList.add('key-error');
          display.children[index].classList.add('letter-error');
          setTimeout(() => btn.classList.remove('key-error'), 600);
          [...allBtn].forEach((btn) => btn.classList.add('btn_disable'));
        }
      }
    }
  });

  //Todo work with physical keyboard
  // document.addEventListener('keydown', (event) => {
  //   console.log(event.code);
  // });
}

function writeKey(key) {
  const display = document.querySelector('.display');
  const symbol = document.createElement('div');
  symbol.classList.add('display__letter');
  symbol.textContent = key;
  display.append(symbol);
}

function checkKey(key, index) {
  const sequence = getSequence();

  if (sequence[index] === Number(key)) {
    return true;
  } else {
    return false;
  }
}

function checkWin() {
  const display = document.querySelector('.display');
  const sequence = getSequence();

  if ([...display.children].length === sequence.length) {
    for (let i = 0; i < sequence.length; i++) {
      if (Number(display.children[i].textContent) === sequence[i]) {
        return true;
      }
    }
  }
  return false;
}

function showWin() {
  const display = document.querySelector('.display');
  [...display.children].forEach((item) => item.classList.add('letter-win'));
}

export { repeatSequence, createNewGame, clickKey };
