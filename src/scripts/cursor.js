export default ({
  mainClass = 'cursor',
  visibleClass = 'cursor--visible',
  visibleBodyClass = 'hide-cursor',
  hoverClass = 'cursor--over-cta',
  hoverElements = 'a, button, input[type="submit"]',
  pressClass = 'cursor--mouse-down'
} = {}) => {
  const cursor = Object.assign(document.createElement('div'), {
    className: mainClass
  });

  document.body.append(cursor);

  const setCursorPosition = e => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0px)`;
  };
  const moveCursor = e => {
    setCursorPosition(e);

    const overCta = e.target.closest(hoverElements);
    cursor.classList[overCta ? 'add' : 'remove'](hoverClass);
  };
  const handlePress = e => {
    cursor.classList[e.type === 'mousedown' ? 'add' : 'remove'](pressClass);
  };
  const showCursor = e => {
    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handlePress, { passive: true });
    window.addEventListener('mouseup', handlePress, { passive: true });

    setCursorPosition(e);
    cursor.classList.add(visibleClass);
    cursor.offsetTop; // wait for next event loop
    document.body.classList.add(visibleBodyClass);
    document.body.removeEventListener('mouseover', showCursor, {
      passive: true
    });

    document.body.addEventListener('mouseleave', hideCursor, { passive: true });
  };
  const hideCursor = () => {
    document.body.removeEventListener('mouseleave', hideCursor);
    window.removeEventListener('mousemove', moveCursor, { passive: true });
    window.removeEventListener('mousedown', handlePress, { passive: true });
    window.removeEventListener('mouseup', handlePress, { passive: true });

    cursor.classList.remove(visibleClass);
    document.body.classList.remove(visibleBodyClass);

    document.body.addEventListener('mouseover', showCursor, { passive: true });
  };

  document.body.addEventListener('mouseover', showCursor, { passive: true });

  window.addEventListener(
    'touchstart',
    () => {
      hideCursor();
      document.body.removeEventListener('mouseover', showCursor, {
        passive: true
      });
    },
    { once: true }
  );
};
