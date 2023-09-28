export const updatePageWithViewTransition = (updater: () => void) => {
  if (!document.startViewTransition) return updater();
  else document.startViewTransition(updater);
};
