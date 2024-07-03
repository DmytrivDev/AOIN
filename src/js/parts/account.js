const accIcon = document.querySelector('.header-acc__icon');
const accClose = document.querySelector('.header-acc__close');
const button = document.querySelector('.header-acc__btn');

const accModal = document.querySelector('.acc-modal');
const body = document.querySelector('body');

if (button) {
  button.addEventListener('click', () => {
    accModal.classList.toggle('is-open');
    accIcon.classList.toggle('is-active');
    accClose.classList.toggle('is-active');
    body.classList.toggle('modal-open');
  });
}
