import _throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

try {
  let formLoad = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (formLoad) {
    formLoad = JSON.parse(formLoad);
    formEl.email.value = formLoad.email;
    formEl.message.value = formLoad.message;
  }
} catch (error) {
  console.error('Error.message ', error.message);
}

formEl.addEventListener(
  'input',
  _throttle(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        email: formEl.email.value,
        message: formEl.message.value,
      })
    );
  }, 500)
);

formEl.addEventListener('submit', event => {
  event.preventDefault();
  formEl.email.value = '';
  formEl.message.value = '';
  localStorage.removeItem(LOCAL_STORAGE_KEY);
});
