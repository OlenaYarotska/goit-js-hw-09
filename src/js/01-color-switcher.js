const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtn() {
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor()
    }, 1000);
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');

};

function onStopBtn() {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
}




