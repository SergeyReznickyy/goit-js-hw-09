import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const selectors = {
  startButton: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      selectors.startButton.disabled = true;
    } else {
      selectors.startButton.disabled = false;
    }
  },
};

let timerTimeout;

selectors.startButton.addEventListener('click', () => {
  if (!selectors.startButton.disabled) {
    const startTime = new Date(
      document.querySelector('#datetime-picker').value
    ).getTime();

    function updateTimer() {
      const currentTime = new Date().getTime();
      const deltaTime = startTime - currentTime;

      if (deltaTime <= 0) {
        selectors.startButton.disabled = true;
        selectors.days.textContent = '00';
        selectors.hours.textContent = '00';
        selectors.minutes.textContent = '00';
        selectors.seconds.textContent = '00';
      } else {
        const { days, hours, minutes, seconds } = getTimeComponents(deltaTime);
        selectors.days.textContent = days;
        selectors.hours.textContent = hours;
        selectors.minutes.textContent = minutes;
        selectors.seconds.textContent = seconds;
        timerTimeout = setTimeout(updateTimer, 1000);
      }
    }

    updateTimer();
  }
});

function pad(value) {
  return String(value).padStart(2, '0');
}

function getTimeComponents(time) {
  const milliseconds = Math.abs(time);
  const seconds = pad(Math.floor((milliseconds / 1000) % 60));
  const minutes = pad(Math.floor((milliseconds / (1000 * 60)) % 60));
  const hours = pad(Math.floor((milliseconds / (1000 * 60 * 60)) % 24));
  const days = pad(
    Math.min(Math.floor(milliseconds / (1000 * 60 * 60 * 24)), 999)
  );
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

flatpickr('#datetime-picker', options);

selectors.startButton.disabled = true;
