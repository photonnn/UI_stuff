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

// Find a way to do this automatically!!
const arr = ['img_1.png', 'img_2.png', 'img_3.png', 'img_4.png'];

function move(n) {
  // const img = [...document.querySelectorAll('.carousel img')][0];
  const images = [...document.querySelectorAll('.carousel img')];

  const next = document.querySelector('.next');
  let number;
  images.forEach((element, i) => {
    if (element === next) {
      number = i;
    } // else if (element === leftNext) {
    // leftNumber = i;
    // }
  });

  // left
  if (number === 0 && n === -1) number = arr.length;

  const imgContainer = document.querySelector('.images');
  if (n === 1) {
    imgContainer.style.transform = `translate(calc(-800px*${number}))`;
  } else if (number === 1) {
    imgContainer.style.transform = `translate(calc(-800px*${arr.length - number}))`;
  } else if (number === 4) {
    // 1) make seperate next for left and right button
    // 2) get current translation and change based on that
    // imgContainer.style.transform = `translate(calc(-1600px))`;
  }
  // right
  if (number + 1 === arr.length && n === 1) number = -1;
  next.classList.remove('next');
  images[number + n].classList.add('next');
}

const right = document.querySelector('.right');
right.addEventListener('click', () => {
  move(1);
});

const left = document.querySelector('.left');
left.addEventListener('click', () => {
  move(-1);
});
/*
setInterval(() => {
  move(1);
}, 5000); */
