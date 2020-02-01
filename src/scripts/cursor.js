export default ({
  mainClass = 'cursor',
  visibleClass = 'cursor--visible',
  visibleBodyClass = 'hide-cursor',
  hoverClass = 'cursor--over-cta',
  hoverElements = 'a, button, input[type="submit"]',
  pressClass = 'cursor--mouse-down',
  hideTransition
} = {}) => {
  const cursor = Object.assign(document.createElement('div'), {
    className: mainClass
  });
  let press;

  const setCursorPosition = e => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0px)`;
  };
  const moveCursor = e => {
    setCursorPosition(e);

    const overCta = e.target.closest(hoverElements);
    cursor.classList[overCta ? 'add' : 'remove'](hoverClass);

    if (!press || !window.getSelection().isCollapsed) return;
    window.scrollTo(0, window.scrollY - e.movementY);
  };
  const handlePress = e => {
    press = e.type === 'mousedown';
    cursor.classList[press ? 'add' : 'remove'](pressClass);
  };
  const showCursor = e => {
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handlePress);
    window.addEventListener('mouseup', handlePress);

    setCursorPosition(e);
    document.body.append(cursor);
    cursor.offsetTop; // wait for next event loop
    document.body.classList.add(visibleBodyClass);
    cursor.classList.add(visibleClass);
    if (hideTransition) {
      cursor.removeEventListener('transitionend', cursor.remove);
    }
    document.body.removeEventListener('mouseover', showCursor);

    document.body.addEventListener('mouseleave', hideCursor);
  };
  const hideCursor = () => {
    document.body.removeEventListener('mouseleave', hideCursor);
    window.removeEventListener('mousemove', moveCursor);
    window.removeEventListener('mousedown', handlePress);
    window.removeEventListener('mouseup', handlePress);

    document.body.classList.remove(visibleBodyClass);
    cursor.classList.remove(visibleClass);
    if (hideTransition) {
      cursor.addEventListener('transitionend', cursor.remove);
    } else {
      cursor.remove();
    }

    document.body.addEventListener('mouseover', showCursor);
  };

  document.body.addEventListener('mouseover', showCursor);

  window.addEventListener(
    'touchstart',
    () => {
      hideCursor();
      document.body.removeEventListener('mouseover', showCursor);
    },
    { once: true }
  );
};
