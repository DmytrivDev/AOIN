import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmpty from 'validator/lib/isEmpty';
import axios from 'axios';
import IMask from 'imask';

import { openingPopup } from './pop-up';

export const formFunc = async () => {
  const telInputs = document.querySelectorAll('input[type="tel"]');

  const telMaskOptions = {
    mask: '+38 (\\000) 000 00 00',
  };

  telInputs?.forEach(input => {
    IMask(input, telMaskOptions);
  });

  async function sendForm(form) {
    const ajaxurl = '/wp-content/themes/fleximp/mail.php'; // Замініть на правильний шлях до mail.php
    const formData = new FormData(form);

    try {
      const response = await axios.post(ajaxurl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response)

      if (response.status === 200) {
        formEnd(form, true);
      } else {
        formEnd(form, false);
      }
    } catch (error) {
      console.error('Error sending form:', error);
      formEnd(form, false);
    }
  }

  function formEnd(form, status) {
    if (status) {
      openingPopup();
      form.reset();
    }

    setTimeout(() => {
      form.reset();

      const filed = form.querySelectorAll('.fileuploadCont ');

      filed?.forEach(el => el.classList.remove('changed'));
    }, 300);
  }

  const forms = document.querySelectorAll('.submitForm');

  forms.forEach(form => {
    form.addEventListener('submit', submitForm);
  });

  function submitForm(e) {
    e.preventDefault();

    removeErrors();

    const fileds = e.target.elements;
    let errors = 0;

    Array.from(fileds).forEach(field => {
      const isReq = field.dataset.required;

      if (isReq) {
        const type = field.type;
        const val = field.value;

        if (checkField(field, type, val)) {
          errors += 1;
        }
      }

      field.addEventListener('focus', removeErrors);
      field.addEventListener('change', removeErrors);
    });

    if (!errors) {
      sendForm(e.target);
    }
  }

  function checkField(field, type, val) {
    let errors = false;

    if (type === 'text') {
      if (isEmpty(val)) {
        errors = true;
        field.classList.add('error');
      }
    }

    if (type === 'email') {
      if (isEmpty(val) || !isEmail(val)) {
        errors = true;
        field.classList.add('error');
      }
    }

    if (type === 'tel') {
      if (
        isEmpty(val) ||
        !isMobilePhone(val.replace(/[^\d+]/g, ''), ['uk-UA'])
      ) {
        errors = true;
        field.classList.add('error');
      }
    }

    if (type === 'checkbox') {
      if (field.checked === false) {
        errors = true;
        field.classList.add('error');
      }
    }

    if (type === 'file') {
      const file = field.files[0];
      const max = 12582912;
      const allowedExt = ['pdf', 'docx', 'doc'];
      let isThueExt = false;

      if (file) {
        const fileExt = file.name
          .split('.')
          [file.name.split('.').length - 1].toLowerCase();

        if (allowedExt.includes(fileExt) && file.size < max) {
          isThueExt = true;
        }
      }

      if (!file || !isThueExt) {
        errors = true;
        field.closest('label').classList.add('error');
      }
    }

    return errors;
  }

  function removeErrors() {
    const errors = document.querySelectorAll('.error');

    errors.forEach(el => {
      el.classList.remove('error');
    });
  }

  const closePopup = document.querySelectorAll('.closePopup');

  closePopup.forEach(btn => {
    btn.addEventListener('click', () => {
      const openedPopup = document.querySelector('.popup.opened');
      openedPopup.classList.remove('opened');
    });
  });

  const fileInputs = document.querySelectorAll('input[type="file"]');

  if (fileInputs) {
    fileInputs.forEach(el => {
      const placeholder = el.getAttribute('placeholder');
      const newInput = document.createElement('div');
      const inputInner = `<button class="uploadBtn">${placeholder}</button><button class="removeBtn"></button>`;

      newInput.classList.add('fileuploadCont', 'form__input');
      newInput.innerHTML = inputInner;
      el.insertAdjacentElement('afterend', newInput);

      const uploadBtn = newInput.querySelector('.uploadBtn');
      const removeBtn = newInput.querySelector('.removeBtn');

      uploadBtn.addEventListener('click', e => {
        e.preventDefault();

        el.click();
      });

      removeBtn.addEventListener('click', e => {
        e.preventDefault();

        el.value = '';
        newInput.classList.remove('changed');
      });

      el.addEventListener('change', e => {
        const fileName = el.files[0].name;

        if (fileName) {
          newInput.classList.add('changed');
          removeBtn.innerHTML = fileName;
        } else {
          newInput.classList.remove('changed');
        }
      });
    });
  }
};
