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

function getNumber(direction) {
  const images = [...document.querySelectorAll('.carousel img')];
  let number;
  images.forEach((element, index) => {
    if (element === direction) {
      number = index;
    }
  });

  return number;
}

function setupTransform(nextNumber) {
  const imgContainer = document.querySelector('.images');
  imgContainer.style.transform = `translate(calc(-800px*${nextNumber}))`;
}

function setupNextAndPrev(number, direction) {
  const images = [...document.querySelectorAll('.carousel img')];
  const newNumber = ((number + 2) % 4);
  console.log(newNumber);
  if (direction === 'next') {
    const prevImg = document.querySelector('.prev');
    prevImg.classList.remove('prev');
    images[newNumber].classList.add('prev');
  } else {
    const nextImg = document.querySelector('.next');
    nextImg.classList.remove('next');
    images[newNumber].classList.add('next');
  }
}

function next() {
  const images = [...document.querySelectorAll('.carousel img')];

  const nextImg = document.querySelector('.next');

  let nextNumber = getNumber(nextImg);

  setupTransform(nextNumber);

  if (nextNumber + 1 === arr.length) nextNumber = -1;
  nextImg.classList.remove('next');
  images[nextNumber + 1].classList.add('next');
  setupNextAndPrev(nextNumber + 1, 'next');
}

function previous() {
  const images = [...document.querySelectorAll('.carousel img')];

  const prevImg = document.querySelector('.prev');

  let prevNumber = getNumber(prevImg);

  setupTransform(prevNumber);

  if (prevNumber === 0) prevNumber = arr.length;
  prevImg.classList.remove('prev');
  images[prevNumber - 1].classList.add('prev');
  setupNextAndPrev(prevNumber - 1, 'prev');
}

const right = document.querySelector('.right');
right.addEventListener('click', () => {
  next();
});

const left = document.querySelector('.left');
left.addEventListener('click', () => {
  previous();
});

setInterval(() => {
  next();
}, 5000);
