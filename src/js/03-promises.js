import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayRef = document.querySelector('input[name=delay]');
const stepRef = document.querySelector('input[name=step]');
const amountRef = document.querySelector('input[name=amount]');
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  let position = 1;
  let delay = Number(delayRef.value);

  for (let i = 0; i < amountRef.value; i++) {
    createPromise(position, delay)
      .then(result => {
        Notify.success(result);
      })
      .catch(error => {
        Notify.failure(error);
      });
    position += 1;
    delay += Number(stepRef.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
