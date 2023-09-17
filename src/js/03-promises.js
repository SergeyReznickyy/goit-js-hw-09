const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = parseInt(event.currentTarget.delay.value);
  const step = parseInt(event.currentTarget.step.value);
  const amount = parseInt(event.currentTarget.amount.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + step * (i - 1);

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
