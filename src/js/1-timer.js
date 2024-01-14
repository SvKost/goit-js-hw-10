import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let userSelectedDate;
let timerInterval;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate >= new Date()) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      iziToast.show({
        tittle: 'Alert',
        message: 'Please choose a date in the future',
      });
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;

  const currentTime = Date.now();
  const elapsedTime = userSelectedDate.getTime() - currentTime;

  displayRemainingTime(elapsedTime);

  timerInterval = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = userSelectedDate.getTime() - currentTime;

    if (elapsedTime <= 0) {
      clearInterval(timerInterval);
      updateTimerInterface(0, 0, 0, 0);
    } else {
      displayRemainingTime(elapsedTime);
    }
  }, 1000);
});

function updateTimerInterface(
  displayedDays,
  displayedHours,
  displayedMinutes,
  displayedSeconds
) {
  daysElement.textContent = addLeadingZero(displayedDays);
  hoursElement.textContent = addLeadingZero(displayedHours);
  minutesElement.textContent = addLeadingZero(displayedMinutes);
  secondsElement.textContent = addLeadingZero(displayedSeconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function displayRemainingTime(elapsedTime) {
  const { days, hours, minutes, seconds } = convertMs(elapsedTime);
  updateTimerInterface(days, hours, minutes, seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
