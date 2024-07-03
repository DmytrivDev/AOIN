import isEmpty from 'validator/lib/isEmpty';

const modalLogin = document.querySelector('.login');
const modalBtnOpen = document.querySelector('.loginBtn');
const modalBtnClose = document.querySelector('.login__close');
const body = document.querySelector('body');

function closeLoginModal() {
  modalLogin?.classList.remove('is-active');
  body.classList.remove('modal-open');
}

if (modalLogin) {
  modalBtnOpen.addEventListener('click', () => {
    modalLogin?.classList.add('is-active');
    body.classList.add('modal-open');
  });

  modalBtnClose.addEventListener('click', () => {
    closeLoginModal();
  });

  modalLogin?.addEventListener('click', e => {
    if (!e.target.closest('.login__body')) {
      closeLoginModal();
    }
  });
}

const inputs = document.querySelectorAll('.login__box input');
const emailInput = document.getElementById('login-name');
const passwordInput = document.getElementById('login-password');
const checkbox = document.getElementById('login-checkbox');

function validateForm() {
  let formIsValid = true;

  if (isEmpty(emailInput.value.trim())) {
    formIsValid = false;
  }

  if (isEmpty(passwordInput.value.trim())) {
    formIsValid = false;
  }

  if (!checkbox.checked) {
    formIsValid = false;
  }

  return formIsValid;
}

function validateField(field) {
  if (field === emailInput) {
    if (isEmpty(emailInput.value.trim())) {
      emailInput.classList.add('error');
    } else {
      emailInput.classList.remove('error');
    }
  }

  if (field === passwordInput) {
    if (isEmpty(passwordInput.value.trim())) {
      passwordInput.classList.add('error');
    } else {
      passwordInput.classList.remove('error');
    }
  }

  if (field === checkbox) {
    if (!checkbox.checked) {
      checkbox.classList.add('error');
    } else {
      checkbox.classList.remove('error');
    }
  }
}

if (modalLogin) {
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
  });

  checkbox.addEventListener('change', () => {
    validateField(checkbox);
  });
}

const formLogin = document.querySelector('.login__form');

export function loginFormSumbit() {
  if (formLogin) {
    formLogin.addEventListener('submit', event => {
      event.preventDefault();

      const validate = validateForm();

      if (!validate) {
        inputs.forEach(input => {
          validateField(input);
        });
        validateField(checkbox);
        return;
      } else {
        sendForm(formLogin);
      }
    });
  }
}

function sendForm(form) {
  const formType = form.dataset.type;
  const acc = form.dataset.acc;
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
        setTimeout(() => {
          window.location.href = acc;
        }, 1000);
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
