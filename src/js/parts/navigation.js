const burger = document.querySelector('.burger-menu');
const headerBtn = document.querySelector('.header__btn');
const mobMenu = document.querySelector('.mob-menu');
const navBtns = document.querySelectorAll('.nav-menu__btn');
const navLinks = document.querySelectorAll('.nav-menu__link');
const body = document.querySelector('body');

function updateMobMenuBodyMargin() {
  const headerTop = document.querySelector('.header__top');
  const mobMenuBody = document.querySelector('.mob-menu__body');

  const height = headerTop.getBoundingClientRect().height;

  mobMenuBody.style.marginTop = `${height}px`;
  mobMenuBody.style.height = `calc(100% - ${height}px)`;
}

function toggleMenu() {
  burger.classList.toggle('is-opened');
  mobMenu.classList.toggle('is-opened');
  headerBtn.classList.toggle('is-hidden');
  body.classList.toggle('overhide');
}

function closeMenu() {
  burger.classList.remove('is-opened');
  mobMenu.classList.remove('is-opened');
  headerBtn.classList.remove('is-hidden');
  body.classList.remove('overhide');
}

export function initMenu() {
  updateMobMenuBodyMargin();
  window.addEventListener('resize', updateMobMenuBodyMargin);

  if (burger) {
    burger.addEventListener('click', toggleMenu);
  }

  if (navLinks) {
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  if (navBtns) {
    navBtns.forEach(btn => {
      btn.addEventListener('click', closeMenu);
    });
  }
}
