import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('span[data-days]'),
  timerHours: document.querySelector('span[data-hours]'),
  timerMinutes: document.querySelector('span[data-minutes]'),
  timerSeconds: document.querySelector('span[data-seconds]'),
  input: document.querySelector('input[datetime-picker]'),
};
let selectedByUserDate;

refs.startBtn.addEventListener('click', onStartBtn);
refs.startBtn.setAttribute('disabled', true);

function onStartBtn() {
  setInterval(() => {
    if (selectedByUserDate <= Date.now()) return;
    const currentTime = convertMs(selectedByUserDate - Date.now());

  refs.timerDays.textContent = addLeadingZero(currentTime.days);
  refs.timerHours.textContent = addLeadingZero(currentTime.hours);
  refs.timerMinutes.textContent = addLeadingZero(currentTime.minutes);
  refs.timerSeconds.textContent = addLeadingZero(currentTime.seconds);
  }, 1000) 
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedByUserDate = selectedDates[0];
    if (selectedByUserDate > Date.now()) {
      refs.startBtn.removeAttribute('disabled');
    }
    else {
      refs.startBtn.setAttribute('disabled', true);
      Notify.failure("Please choose a date in the future");
    }
  },
};

flatpickr("input", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};


function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};