// Find a way to assign to array automatically!
const arr = ['img_1.png', 'img_2.png', 'img_3.png', 'img_4.png'];
// ideally assign these buttons based on array
// they represent id's
const btns = ['btn_1', 'btn_2', 'btn_3', 'btn_4'];

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

// we are transforming the container rather than use background-image, so we can
// get cool transitions on the images
function setupTransform(nextNumber) {
  const imgContainer = document.querySelector('.images');
  imgContainer.style.transform = `translate(calc(-800px*${nextNumber}))`;
}

// this is seperate from the one in function, though with little changes it may
// be further optimized for readability, because this is taken into account
// after the next prev or next is assigned after the user clicks the button
// therefore the one in the next/previous has to taken in account +1/-1
function assignNextOrPrev(number, direction) {
  const images = [...document.querySelectorAll('.carousel img')];
  const img = document.querySelector(`.${direction}`);
  img.classList.remove(`${direction}`);
  images[number].classList.add(`${direction}`);
}

function setupButton(number) {
  const prevSelected = document.querySelector('.selected');
  prevSelected.classList.remove('selected');

  const btn = document.querySelector(`#${btns[number]}`);
  btn.classList.add('selected');
}

// prev and next always have to be 2 units away from each other
// therefore when one changes so must the other one
function setupNextAndPrev(number, direction) {
  const newNumber = (number + 2) % 4;
  if (direction === 'next') {
    assignNextOrPrev(newNumber, 'prev');
  } else {
    assignNextOrPrev(newNumber, 'next');
  }
}

function next() {
  const images = [...document.querySelectorAll('.carousel img')];

  const nextImg = document.querySelector('.next');

  let nextNumber = getNumber(nextImg);

  setupTransform(nextNumber);
  setupButton(nextNumber);

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
  setupButton(prevNumber);

  if (prevNumber === 0) prevNumber = arr.length;
  prevImg.classList.remove('prev');
  images[prevNumber - 1].classList.add('prev');
  setupNextAndPrev(prevNumber - 1, 'prev');
}

let interval = setInterval(() => {
  next();
}, 5000);

// this is done once user clicks a button, so it does not obstruct their
// experience with annoying sliding
function resetInterval() {
  clearInterval(interval);
  interval = setInterval(() => {
    next();
  }, 5000);
}

const right = document.querySelector('.right');
right.addEventListener('click', () => {
  resetInterval();
  next();
});

const left = document.querySelector('.left');
left.addEventListener('click', () => {
  resetInterval();
  previous();
});

btns.forEach((element, i) => {
  const btn = document.querySelector(`#${btns[i]}`);
  btn.addEventListener('click', () => {
    const nextImg = document.querySelector('.next');
    const curNumber = (getNumber(nextImg) + 3) % 4;
    // i -> the one that you click 0-3
    // curNumber self explanatory 0-3
    if (i - curNumber > 0) {
      for (let j = 0; j < i - curNumber; j += 1) {
        resetInterval();
        next();
      }
    } else {
      for (let j = 0; j < curNumber - i; j += 1) {
        resetInterval();
        previous();
      }
    }
  });
});
