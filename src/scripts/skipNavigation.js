(() => {
  const link = document.querySelector('.skip-navigation');
  if (!link) return;
  const target = document.querySelector(link.hash);
  if (!target) return;

  target.tabIndex = -1;
  link.addEventListener('click', (e) => {
    e.preventDefault();
    target.focus();
  });
})();
