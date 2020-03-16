export default ({
  buttonSelector = '.theme-switcher',
  documentClass = 'other-theme'
} = {}) => {
  const button = document.querySelector(buttonSelector);
  if (!button || !window.CSS || !CSS.supports('top', 'var(--)')) return;

  button.hidden = false;

  button.addEventListener('click', () => {
    const newTheme = localStorage.getItem('theme') ? '' : documentClass;

    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  });
};
