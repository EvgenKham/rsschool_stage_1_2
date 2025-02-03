let timer = undefined;
let userTime = 0;
let savedTime = 0;
let stateTimer = false;

function startTimer() {
  const displayTimer = document.querySelector('.timer');
  stateTimer = true;

  timer = setInterval(() => {
    userTime++;
    const time = convertTime(userTime);
    displayTimer.textContent = time;
  }, 1000);
}

function stopTimer() {
  stateTimer = false;
  clearInterval(timer);
}

function saveTimer() {
  savedTime = userTime;
  return savedTime;
}

function resetTimer() {
  userTime = 0;
  const displayTimer = document.querySelector('.timer');
  displayTimer.textContent = '00 : 00';
}

function convertTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  let result = undefined;
  if (minutes < 10 && seconds < 10) {
    result = `0${minutes} : 0${seconds}`;
  }
  if (minutes < 10 && seconds >= 10) {
    result = `0${minutes} : ${seconds}`;
  }
  if (minutes > 10 && seconds < 10) {
    result = `${minutes} : 0${seconds}`;
  }
  if (minutes > 10 && seconds > 10) {
    result = `${minutes} : ${seconds}`;
  }
  return result;
}

export { startTimer, stopTimer, saveTimer, resetTimer, stateTimer };
