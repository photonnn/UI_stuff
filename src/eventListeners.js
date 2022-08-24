import { removeMenu, showMenu } from './hamburgerMenu';

const menuBtn = document.querySelector('.menuBtn');
menuBtn.addEventListener('click', () => {
  showMenu('hamburgerMenu');
  // for now anyway
});

const content = document.querySelector('.content');
content.addEventListener('click', () => {
  removeMenu('hamburgerMenu');
});
