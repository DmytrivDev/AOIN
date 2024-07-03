import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

const accordionContainer = document.querySelector('.accordion-container');
if (accordionContainer) {
  new Accordion('.accordion-container', {
    duration: 400,
    showMultiple: true,
    showMultiple: false,
    openOnInit: [0],
  });
}

const accordionItems = document.querySelectorAll('.services__item');

accordionItems.forEach(item => {
  item.addEventListener('click', function () {
    const imgSrc = this.dataset.src;
    const imgElement = document.querySelector('.services__img-wrapp img');

    if (imgSrc && imgElement) {
      imgElement.src = imgSrc;
    }
  });
});
