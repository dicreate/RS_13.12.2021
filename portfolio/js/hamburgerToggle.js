
const navMenu = document.querySelector('.nav__menu');
const blackOut = document.querySelector('.blackout');

export const hamburgerToggle = () => {
   hamburger.classList.toggle('is-active');
   navMenu.classList.toggle('open');
   blackOut.classList.toggle('visible');
}