export default ({
  webshareSelector = '.post-meta__item--webshare',
  fallbackSelector = '.post-meta__item--twittershare'
} = {}) => {
  if (!navigator.share) return;

  document
    .querySelectorAll(webshareSelector)
    .forEach(el => (el.hidden = false));
  document.querySelectorAll(fallbackSelector).forEach(el => el.remove());

  window.addEventListener('click', e => {
    const button = e.target.closest(webshareSelector);
    if (!button) return;

    const { title, text, url } = button.dataset;
    navigator.share({ title, text, url });
  });
};
