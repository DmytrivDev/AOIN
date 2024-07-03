import { toggle, up } from 'slide-element';

export const mobileNav = () => {
  const navCont = document.querySelector('.nabigation');
  const footCont = document.querySelector('.footer__content');

  navCont.addEventListener('click', openNavItem);
  footCont.addEventListener('click', openNavItem);

  function openNavItem(event) {
    const target = event.target;
    const currentTarget = event.currentTarget;
    const isItem = target.classList.contains('menu-item-has-children');

    if (isItem) {
      const allItems = currentTarget.querySelectorAll(
        '.menu-item-has-children.opened'
      );
      const subNav = target.querySelector('.sub-menu');
      toggle(subNav);
      target.classList.toggle('opened');

      allItems.forEach(item => {
        if (item !== target) {
          const subNavOth = item.querySelector('.sub-menu');
          up(subNavOth);
          item.classList.remove('opened');
        }
      });
    }
  }
};

export const openNav = () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nabigation');
  const body = document.querySelector('body');

  hamburger.addEventListener('click', event => {
    event.preventDefault();
    toggle(nav);
    hamburger.classList.toggle('opened');
    body.classList.toggle('overHideMob');
  });
};
