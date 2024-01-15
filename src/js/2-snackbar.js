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
  const fullfilledBtnChecked = fullfilledBtn.checked;
  const rejectedBtnChecked = rejectedBtn.checked;

  const promise = new Promise((resolve, reject) => {
    if (fullfilledBtnChecked) {
      setTimeout(() => {
        resolve('fullfiled');
      }, delay);
    } else if (rejectedBtnChecked) {
      setTimeout(() => {
        reject('rejected');
      }, delay);
    }
  });

  promise.then(
    value => {
      iziToast.show({
        title: '',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        color: 'green',
      });
    },
    error => {
      iziToast.show({
        title: '',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        color: 'red',
      });
    }
  );
}
