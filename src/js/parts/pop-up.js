const modalBtnOpen = document.querySelector('.open-popup');
const modalBtnClose = document.querySelector('.pop-up__close');
const modalPopup = document.querySelector('.pop-up');
const body = document.querySelector('body');

// modalBtnOpen.addEventListener('click', () => {
//   modalPopup.classList.add('is-active');
//   body.classList.add('modal-open');
// });

export const openingPopup = () => {
  modalPopup.classList.add('is-active');
  body.classList.add('modal-open');
}

modalBtnClose?.addEventListener('click', () => {
  modalPopup.classList.remove('is-active');
  body.classList.remove('modal-open');
});

modalPopup?.addEventListener('click', e => {
  if (!e.target.closest('.pop-up__body')) {
    modalPopup.classList.remove('is-active');
    body.classList.remove('modal-open');
  }
});
