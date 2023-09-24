(({ selector = '.nav', fixedClass = 'nav--fixed', fixedHiddenClass = 'nav--hide' } = {}) => {
  const nav = document.querySelector(selector);
  if (!nav) return;

  let prevY = window.scrollY;
  let show: boolean;
  let hide: boolean;
  const scrollHandler = () => {
    const curY = window.scrollY;
    if (curY === prevY) return;

    const isScrollingToTop = curY < prevY;

    show = (curY && show) || (curY > window.innerHeight / 3 && isScrollingToTop);

    hide = show && !isScrollingToTop;

    nav.classList.toggle(fixedClass, show);
    nav.classList.toggle(fixedHiddenClass, hide);
    prevY = curY;
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });

  // don't make the navigation sticky by navigating through anchors in history
  window.addEventListener('hashchange', () => {
    window.removeEventListener('scroll', scrollHandler);
    window.addEventListener(
      'scroll',
      () => window.addEventListener('scroll', scrollHandler, { passive: true }),
      { once: true, passive: true },
    );
  });
})();
