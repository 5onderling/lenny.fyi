export default ({
  selector = '.nav',
  fixedClass = 'nav--fixed',
  fixedHiddenClass = 'nav--hide',
} = {}) => {
  const nav = document.querySelector(selector);
  if (!nav) return;

  let prevY = window.pageYOffset;
  let show, hide;
  const scrollHandler = () => {
    const curY = window.pageYOffset;
    if (curY === prevY) return;

    const isScrollingToTop = curY < prevY;

    show =
      (curY && show) || (curY > window.innerHeight / 3 && isScrollingToTop);

    hide = show && !isScrollingToTop;

    nav.classList[show ? 'add' : 'remove'](fixedClass);
    nav.classList[hide ? 'add' : 'remove'](fixedHiddenClass);
    prevY = curY;
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  // don't make the navigation sticky by navigating through anchors in history
  window.addEventListener('hashchange', () => {
    window.removeEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener(
      'scroll',
      () => window.addEventListener('scroll', scrollHandler, { passive: true }),
      { once: true, passive: true },
    );
  });
};
