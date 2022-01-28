import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/material_green.css');

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
const days_js = document.querySelector('[data-days]');
const hours_js = document.querySelector('[data-hours]');
const minutes_js = document.querySelector('[data-minutes]');
const seconds_js = document.querySelector('[data-seconds]');

const currentDate = Date.now();
let futureTime;
start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const millicounts = selectedDates[0].getTime();
    if (millicounts < 0) {
      window.alert('Please choose a date in the future');
      return;
    }
    start.disabled = false;
    futureTime = millicounts;
  },
};
flatpickr(input, options);

start.addEventListener('click', onStartButtonClick);

const timer = {
  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = futureTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      days_js.textContent = addLeadingZero(days);
      hours_js.textContent = addLeadingZero(hours);
      minutes_js.textContent = addLeadingZero(minutes);
      seconds_js.textContent = addLeadingZero(seconds);
    }, 1000);
  },
};

function onStartButtonClick(futureDate) {
  timer.start(futureDate);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day); // Remaining days
  const hours = Math.floor((ms % day) / hour); // Remaining hours
  const minutes = Math.floor(((ms % day) % hour) / minute); // Remaining minutes
  const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Remaining seconds

  return { days, hours, minutes, seconds };
}
