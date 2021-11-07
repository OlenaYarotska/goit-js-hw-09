import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget;

  let delayPromise = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, delayPromise).then(({ position, delay }) => {
      setTimeout(() => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      }, delay)
    })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        }, delay)
      });
    delayPromise += Number(step.value);
  };
    }
      

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay })
    } else {
      reject({ position, delay })
    }
  })
}
