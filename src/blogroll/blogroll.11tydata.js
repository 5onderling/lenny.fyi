const { getImage, getImageHtml } = require('./getImage.js');

module.exports = async () => {
  const blogs = {
    WebDev: [
      { name: 'Adam Silver', url: 'https://adamsilver.io' },
      {
        name: 'Andrea Giammarchi',
        url: 'https://webreflection.medium.com',
        imageUrl:
          'https://files.mastodon.social/accounts/avatars/000/033/932/original/b2dc758e49bdc71e.jpg',
      },
      { name: 'Anthony Fu', url: 'https://antfu.me' },
      { name: 'bitsofcode', url: 'https://bitsofco.de' },
      { name: 'Chris Coyier', url: 'https://chriscoyier.net' },
      { name: 'CSS { In Real Life }', url: 'https://css-irl.info' },
      { name: 'David Darnes', url: 'https://darn.es' },
      { name: 'Der Schepp', url: 'https://schepp.dev' },
      { name: 'HeydonWorks', url: 'https://heydonworks.com' },
      { name: 'Jake Archibald', url: 'https://jakearchibald.com' },
      { name: 'Josh W Comeau', url: 'https://www.joshwcomeau.com' },
      { name: 'Lynn Fisher', url: 'https://lynnandtonic.com' },
      { name: 'Manuel Matuzovic', url: 'https://www.matuzo.at' },
      { name: 'Marvin Hagemeister', url: 'https://marvinh.dev' },
      { name: 'Max Böck', url: 'https://mxb.dev' },
      { name: 'Modern CSS Solutions', url: 'https://moderncss.dev' },
      { name: 'Paweł Grzybek', url: 'https://pawelgrzybek.com' },
      { name: 'Philip Walton', url: 'https://philipwalton.com' },
      { name: 'PQINA', url: 'https://pqina.nl' },
      { name: 'Sara Soueidan', url: 'https://www.sarasoueidan.com' },
      { name: "Scott O'Hara", url: 'https://www.scottohara.me' },
      { name: 'Sebastian De Deyne', url: 'https://sebastiandedeyne.com' },
      { name: 'Tania Rascia', url: 'https://www.taniarascia.com' },
      { name: 'Tobias Ahlin', url: 'https://tobiasahlin.com' },
      { name: 'Nikita Prokopov', url: 'https://tonsky.me' },
      { name: 'Zach Leatherman', url: 'https://www.zachleat.com' },
      { name: 'zserge', url: 'https://zserge.com' },
    ],
    GameDev: [
      { name: 'matt sephton', url: 'https://blog.gingerbeardman.com' },
      { name: 'AMANO', url: 'https://amano.games' },
      { name: 'Cadin Batrack', url: 'https://devblog.cadinbatrack.com' },
      {
        name: 'Lucas Pope',
        url: 'https://dukope.com',
        imageUrl:
          'https://files.mastodon.social/accounts/avatars/109/515/037/453/915/631/original/202e0871ff959941.png',
      },
      { name: 'Retronator', url: 'https://www.retronator.com' },
    ],
    Other: [
      { name: 'Björn Ottosson', url: 'https://bottosson.github.io' },
      { name: 'StorySplinters', url: 'https://storysplinters.com' },
      { name: 'Annands Anime Stube (German)', url: 'https://annandsanimestube.wordpress.com' },
    ],
  };

  for (const category in blogs) {
    blogs[category] = await Promise.all(
      blogs[category]
        .sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        })
        .map(async (blog) => ({
          ...blog,
          icon: blog.imageUrl ? await getImageHtml(blog.imageUrl) : await getImage(blog.url),
        })),
    );
  }

  return { blogs };
};
