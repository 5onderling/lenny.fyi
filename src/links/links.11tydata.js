const { getWebsiteImage, getImageHtml } = require('../utils/getImage.js');

module.exports = async () => {
  const links = {
    Methodologies: [
      { name: 'BEM', url: 'https://getbem.com' },
      { name: 'Utopia', url: 'https://utopia.fyi' },
    ],
    'GUI Tools': [
      { name: 'SVGOMG', url: 'https://jakearchibald.github.io/svgomg' },
      {
        name: 'Encode SVG SCSS',
        url: 'https://codepen.io/jakob-e/full/doMoML',
      },
      { name: 'Google Webfonts helper', url: 'https://gwfh.mranftl.com/fonts' },
      { name: 'CSS Gradient Generator', url: 'https://www.joshwcomeau.com/gradient-generator' },
      { name: 'Squoosh', url: 'https://squoosh.app' },
      { name: 'pkg-size', url: 'https://pkg-size.dev' },
      { name: 'Icônes', url: 'https://icones.js.org' },
    ],
    Tutorials: [
      {
        name: 'CSS Scrollbar using matrix3d()',
        url: 'https://developer.chrome.com/blog/custom-scrollbar',
      },
      {
        name: 'Black to Color using CSS filter()',
        url: 'https://stackoverflow.com/questions/42966641/how-to-transform-black-into-any-given-color-using-only-css-filters/43960991#43960991',
      },
      { name: 'CSS Full Bleed Background', url: 'https://codepen.io/SelenIT/pen/bGLmGVq' },
    ],
    Talks: [
      { name: 'Hakim El Hattab | Building Better Interfaces', url: 'https://youtu.be/o0NtjY17v5w' },
      {
        name: '3.143 ways to synchronize data across documents - HTTP 203',
        url: 'https://youtu.be/9UNwHmagedE',
      },
      { name: 'Bret Victor - Inventing on Principle', url: 'https://youtu.be/PGDrIy1G1gU' },
      {
        name: 'Heydon Pickering / Capitalism, The Web, And You',
        url: 'https://youtu.be/GZsIhiXJjpY',
      },
    ],
  };

  for (const category in links) {
    links[category] = await Promise.all(
      links[category].map(async (link) => ({
        ...link,
        icon: link.imageUrl ? await getImageHtml(link.imageUrl) : await getWebsiteImage(link.url),
      })),
    );
  }

  return { links };
};
