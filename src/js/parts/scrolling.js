import scrollToElement from 'scroll-to-element';

export const scrolling = () => {
    const scrollBtns = document.querySelectorAll('.ankor');
    scrollBtns?.forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        
        const btn = e.currentTarget.dataset.target;
        const target = document.getElementById(btn);
    
        scrollToElement(target, {
          duration: 1000,
        });
      });
    });
}
