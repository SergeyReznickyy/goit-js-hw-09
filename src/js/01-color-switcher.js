function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

function changeBackgroundColor() {
  const newColor = getRandomHexColor();
  body.style.backgroundColor = newColor;
}

function startChangingColor() {
  timerId = setInterval(changeBackgroundColor, 1000);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
}

function stopChangingColor() {
  clearInterval(timerId);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}

buttonStart.addEventListener('click', startChangingColor);
buttonStop.addEventListener('click', stopChangingColor);
