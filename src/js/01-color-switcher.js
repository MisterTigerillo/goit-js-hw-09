const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let colorID = null;

startButton.addEventListener('click', onBtnStartClick);
stopButton.addEventListener('click', onBtnStopClick);

function onBtnStartClick(e) {
  e.target.disabled = true;
  stopButton.disabled = false;
  colorID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onBtnStopClick(e) {
  e.target.disabled = true;
  startButton.disabled = false;
  clearInterval(colorID);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
