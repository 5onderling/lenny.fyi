export default ({
  buttonSelector = '.theme-switcher',
  bodyClass = 'other-theme',
  storagekey = 'otherThemeActivated'
} = {}) => {
  const button = document.querySelector(buttonSelector);
  if (!button) return;

  if (+localStorage.getItem(storagekey)) {
    document.body.classList.add(bodyClass, 'no-transition');

    requestAnimationFrame(() => {
      document.body.classList.remove('no-transition');
    });
  }

  button.addEventListener('click', () => {
    document.body.classList.toggle(bodyClass);

    localStorage.setItem(
      storagekey,
      +document.body.classList.contains(bodyClass)
    );
  });
};
