const buttonSelector = '.burger';
const bodyClass = 'nav-menu-open';

const button = document.querySelector<HTMLButtonElement>(buttonSelector);

export const toggleNavigation = (force?: boolean) => {
  document.body.classList.toggle(bodyClass, force);
};

export const isNavigationVisible = () => document.body.classList.contains(bodyClass);

if (button) {
  button.hidden = false;
  button.addEventListener('click', () => toggleNavigation());
}
