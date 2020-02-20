export default ({ selector = '.nav', fixedClass = 'nav--fixed' } = {}) => {
  const nav = document.querySelector(selector);
  if (!nav) return;

  let prevY = window.pageYOffset;
  const scrollHandler = () => {
    const curY = window.pageYOffset;
    if (curY === prevY || (curY && curY < window.innerHeight / 3)) return;

    nav.classList[curY && curY < prevY ? 'add' : 'remove'](fixedClass);
    prevY = curY;
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  // don't make the navigation sticky by navigating through anchors in history
  window.addEventListener('hashchange', () => {
    window.removeEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener(
      'scroll',
      () => window.addEventListener('scroll', scrollHandler, { passive: true }),
      { once: true, passive: true }
    );
  });
};
