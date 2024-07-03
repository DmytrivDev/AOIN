import isEmail from 'validator/lib/isEmail';

const modalLogin = document.querySelector('.login');
const modalRecovery = document.querySelector('.recovery');

const modalBtnOpen = document.querySelector('.login__recovery');
const modalBtnClose = document.querySelector('.recovery__close');
const body = document.querySelector('body');

function closeRecoveryModal() {
  modalRecovery.classList.remove('is-active');
  body.classList.remove('modal-open');
}

if (modalRecovery) {
  modalBtnOpen.addEventListener('click', () => {
    modalLogin.classList.remove('is-active');
    modalRecovery.classList.add('is-active');
    body.classList.add('modal-open');
  });

  modalBtnClose.addEventListener('click', () => {
    closeRecoveryModal();
  });

  modalRecovery.addEventListener('click', e => {
    if (!e.target.closest('.recovery__body')) {
      closeRecoveryModal();
    }
  });
}

const emailInput = document.getElementById('recovery-email');

function validateForm() {
  let formIsValid = true;

  if (!isEmail(emailInput.value.trim())) {
    formIsValid = false;
  }

  return formIsValid;
}

function validateField(field) {
  if (field === emailInput) {
    if (!isEmail(emailInput.value.trim())) {
      emailInput.classList.add('error');
    } else {
      emailInput.classList.remove('error');
    }
  }
}

if (modalRecovery) {
  emailInput.addEventListener('blur', () => validateField(emailInput));
}

const formRecovery = document.querySelector('.recovery__form');

export function recoveryFormSumbit() {
  if (formRecovery) {
    formRecovery.addEventListener('submit', event => {
      event.preventDefault();

      const validate = validateForm();

      if (!validate) {
        validateField(emailInput);
        return;
      } else {
        sendForm(formRecovery);
      }
    });
  }
}


function sendForm(form) {
  const formType = form.dataset.type;
  const button = form.querySelector('button');
  const errorList = form.querySelector('.error__container');

  const formData = new FormData(form);
  formData.append('action', 'user_' + formType);

  errorList.innerHTML = '';

  fetch('/wp-admin/admin-ajax.php', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        errorList.insertAdjacentHTML(
          'beforeend',
          `<li class="success">${data.message}</li>`
        );
        reForm(errorList, button);
      } else {
        errorList.insertAdjacentHTML('beforeend', `<li>${data.message}</li>`);
        reForm(errorList, button);
      }
    })
    .catch(error => {
      errorList.insertAdjacentHTML(
        'beforeend',
        `<li>AJAX error: ${error}</li>`
      );
      reForm(errorList, button);
    })
    .finally(() => {
      button.disabled = false;
    });

  button.disabled = true;
}

function reForm(errorList, button) {
  errorList.classList.add('isErrors');
  button.disabled = false;
}
