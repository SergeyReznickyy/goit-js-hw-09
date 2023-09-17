import flatpickr from 'flatpickr';
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
    console.log(selectedDates[0]);

    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.failure('Enter the date of the upcoming event');
      selectors.startButton.disabled = true;
    } else {
      selectors.startButton.disabled = false;
    }

    const timer = {
      start() {
        setInterval(() => {
          const startTime = selectedDates[0];
          const finishTime = Date.now();
          const deltaTime = startTime - finishTime;
          const { days, hours, minutes, seconds } =
            getTimeComponents(deltaTime);
          selectors.days.textContent = days;
          selectors.hours.textContent = hours;
          selectors.minutes.textContent = minutes;
          selectors.seconds.textContent = seconds;
        }, 1000);
      },
    };

    selectors.startButton.addEventListener('click', () => {
      timer.start();
      if (
        selectors.days.textContent === '00' &&
        selectors.hours.textContent === '00' &&
        selectors.minutes.textContent === '00' &&
        selectors.seconds.textContent === '00'
      ) {
        return;
      }
    });
  },
};
flatpickr('#datetime-picker', options);
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
