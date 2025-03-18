(() => {
  const link = document.querySelector<HTMLAnchorElement>('.skip-navigation');
  if (!link) return;
  const target = document.querySelector<HTMLAnchorElement>(link.hash);
  if (!target) return;

  target.tabIndex = -1;
  link.addEventListener('click', (e) => {
    e.preventDefault();
    target.focus();
  });
})();
