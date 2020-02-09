export default ({ selector = '.nav', fixedClass = 'nav--fixed' } = {}) => {
  const nav = document.querySelector(selector);
  if (!nav) return;

  let prevY = window.pageYOffset;
  window.addEventListener('scroll', e => {
    const curY = window.pageYOffset;
    if (curY === prevY || (curY && curY < window.innerHeight / 3)) return;

    nav.classList[curY && curY < prevY ? 'add' : 'remove'](fixedClass);
    prevY = curY;
  });
};
