document.addEventListener('DOMContentLoaded', () => {
  const heroSec = document.querySelector('.hero');
  const elementsToAnimate = heroSec.querySelectorAll(
    '.elem-animation, .elem-animation-1, .elem-animation-2, .elem-animation-3'
  );

  const sections = document.querySelectorAll('.sec-animation');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target
            .querySelectorAll(
              '.elem-animation, .elem-animation-1, .elem-animation-2, .elem-animation-3'
            )
            .forEach(el => el.classList.add('is-visible'));

          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -200px 0px',
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });

  elementsToAnimate.forEach(element => {
    element.classList.add('is-visible');
  });
});
