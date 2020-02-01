export default ({
  buttonSelector = '.theme-switcher',
  bodyClass = 'other-theme',
  storagekey = 'otherThemeActivated'
} = {}) => {
  const button = document.querySelector(buttonSelector);
  if (!button || !(CSS || CSS.supports('color', 'var(--test)'))) return;

  button.removeAttribute('hidden');

  if (+localStorage.getItem(storagekey)) {
    document.body.classList.add(bodyClass);
  }

  button.addEventListener('click', () => {
    document.body.classList.toggle(bodyClass);

    localStorage.setItem(
      storagekey,
      +document.body.classList.contains(bodyClass)
    );
  });
};
