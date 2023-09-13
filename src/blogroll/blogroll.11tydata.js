const { getImage, getImageHtml } = require('./getImage.js');

module.exports = async () => {
  const blogs = [
    {
      name: 'Adam Silver',
      url: 'https://adamsilver.io',
    },
    {
      name: 'Andrea Giammarchi',
      url: 'https://webreflection.medium.com',
      imageUrl:
        'https://files.mastodon.social/accounts/avatars/000/033/932/original/b2dc758e49bdc71e.jpg',
    },
    {
      name: 'Anthony Fu',
      url: 'https://antfu.me',
    },
    {
      name: 'bitsofcode',
      url: 'https://bitsofco.de',
    },
    {
      name: 'CSS { In Real Life }',
      url: 'https://css-irl.info',
    },
    {
      name: 'David Darnes',
      url: 'https://darn.es',
    },
    {
      name: 'Der Schepp',
      url: 'https://schepp.dev',
    },
    {
      name: 'HeydonWorks',
      url: 'https://heydonworks.com',
    },
    {
      name: 'Jake Archibald',
      url: 'https://jakearchibald.com',
    },
    {
      name: 'Josh W Comeau',
      url: 'https://www.joshwcomeau.com',
    },
    {
      name: 'Lynn Fisher',
      url: 'https://lynnandtonic.com',
    },
    {
      name: 'Manuel Matuzovic',
      url: 'https://www.matuzo.at',
    },
    {
      name: 'Marvin Hagemeister',
      url: 'https://marvinh.dev',
    },
    {
      name: 'Max Böck',
      url: 'https://mxb.dev',
    },
    {
      name: 'Modern CSS Solutions',
      url: 'https://moderncss.dev',
    },
    {
      name: 'Paweł Grzybek',
      url: 'https://pawelgrzybek.com',
    },
    {
      name: 'Philip Walton',
      url: 'https://philipwalton.com',
    },
    {
      name: 'PQINA',
      url: 'https://pqina.nl',
    },
    {
      name: 'Sara Soueidan',
      url: 'https://www.sarasoueidan.com',
    },
    {
      name: "Scott O'Hara",
      url: 'https://www.scottohara.me',
    },
    {
      name: 'Sebastian De Deyne',
      url: 'https://sebastiandedeyne.com',
    },
    {
      name: 'Tania Rascia',
      url: 'https://www.taniarascia.com',
    },
    {
      name: 'Tobias Ahlin',
      url: 'https://tobiasahlin.com',
    },
    {
      name: 'Nikita Prokopov',
      url: 'https://tonsky.me',
    },
    {
      name: 'Zach Leatherman',
      url: 'https://www.zachleat.com',
    },
    {
      name: 'zserge',
      url: 'https://zserge.com',
    },
  ];

  const blogsWithImages = await Promise.all(
    blogs.map(async (blog) => ({
      ...blog,
      icon: blog.imageUrl ? await getImageHtml(blog.imageUrl) : await getImage(blog.url),
    })),
  );

  const sortet = blogsWithImages.sort((a, b) => a.name - b.name);

  return { blogs: sortet };
};
