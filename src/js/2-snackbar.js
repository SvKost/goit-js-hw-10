import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const fullfilledBtn = document.querySelector('input[value="fulfilled"]');
const rejectedBtn = document.querySelector('input[value="rejected"]');

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = inputDelay.value;
  handleSubmitBtn(delay);
});

function handleSubmitBtn(delay) {
  const fullfilledBtnCheked = fullfilledBtn.checked;
  const rejectedBtnCheked = rejectedBtn.checked;

  const promise = new Promise((resolve, reject) => {
    if (fullfilledBtnCheked) {
      setTimeout(() => {
        resolve('fullfiled');
      }, delay);
    } else if (rejectedBtnCheked) {
      setTimeout(() => {
        reject('rejected');
      }, delay);
    }
  });

  promise.then(
    value => {
      iziToast.show({
        title: 'Fullfiled',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    },
    error => {
      iziToast.show({
        title: 'Rejected',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    }
  );
}
