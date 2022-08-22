export function showMenu(id) {
  const menu = document.querySelector(`#${id}`);
  menu.classList.add('visible');
  // anway
}

export function removeMenu(id) {
  const menu = document.querySelector(`#${id}`);
  menu.classList.remove('visible');
  // anyway
}
