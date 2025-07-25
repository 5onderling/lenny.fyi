import { getWebsiteImage, getWebsiteImageHtml } from '../utils/getImage.js';
import { getLatestBlogPost } from '../utils/getLatestBlogPost.js';

export default async () => {
  const blogs = {
    WebDev: [
      { name: 'Adam Argyle', url: 'https://nerdy.dev', feed: '/rss.xml' },
      { name: 'Adam Silver', url: 'https://adamsilver.io', feed: '/atom.xml' },
      {
        name: 'Andrea Giammarchi',
        url: 'https://webreflection.medium.com',
        feed: 'https://medium.com/feed/@webreflection',
      },
      { name: 'Anthony Fu', url: 'https://antfu.me', feed: '/feed.xml' },
      { name: 'bitsofcode', url: 'https://bitsofco.de', feed: '/feed/feed.xml' },
      { name: 'Bram.us', url: 'https://www.bram.us', feed: '/feed' },
      { name: 'Chris Coyier', url: 'https://chriscoyier.net', feed: '/feed' },
      { name: 'CSS { In Real Life }', url: 'https://css-irl.info', feed: '/rss.xml' },
      { name: 'David Darnes', url: 'https://darn.es', feed: '/rss.xml' },
      { name: 'Der Schepp', url: 'https://schepp.dev', feed: '/feed/feed.xml' },
      { name: 'HeydonWorks', url: 'https://heydonworks.com', feed: '/feed.xml' },
      { name: 'Jake Archibald', url: 'https://jakearchibald.com', feed: '/posts.rss' },
      { name: 'Josh W Comeau', url: 'https://www.joshwcomeau.com', feed: '/rss.xml' },
      { name: 'Lynn Fisher', url: 'https://lynnandtonic.com', feed: '/feed.xml' },
      { name: 'Manuel Matuzovic', url: 'https://www.matuzo.at', feed: '/feed_all.xml' },
      { name: 'Marvin Hagemeister', url: 'https://marvinh.dev', feed: '/feed.xml' },
      { name: 'Max Böck', url: 'https://mxb.dev', feed: '/feed.xml' },
      { name: 'Modern CSS Solutions', url: 'https://moderncss.dev', feed: '/feed' },
      { name: 'Nikita Prokopov', url: 'https://tonsky.me', feed: '/atom.xml' },
      {
        name: 'Own Your Web',
        url: 'https://buttondown.email/ownyourweb/archive',
        feed: '/ownyourweb/rss',
        useFullUrlForImage: true,
      },
      { name: 'Paweł Grzybek', url: 'https://pawelgrzybek.com', feed: '/feed.xml' },
      {
        name: 'Philip Walton',
        url: 'https://philipwalton.com',
        feed: 'https://feeds.feedburner.com/philipwalton',
      },
      { name: 'PQINA', url: 'https://pqina.nl', feed: '/feed.xml' },
      { name: 'Sara Soueidan', url: 'https://www.sarasoueidan.com', feed: '/blog/index.xml' },
      { name: "Scott O'Hara", url: 'https://www.scottohara.me', feed: '/feed.xml' },
      { name: 'Sebastian De Deyne', url: 'https://sebastiandedeyne.com', feed: '/index.xml' },
      { name: 'Sindre Sorhus', url: 'https://sindresorhus.com', feed: '/rss.xml' },
      { name: 'Tania Rascia', url: 'https://www.taniarascia.com', feed: '/rss.xml' },
      { name: 'Tobias Ahlin', url: 'https://tobiasahlin.com', feed: '/feed.xml' },
      { name: 'Zach Leatherman', url: 'https://www.zachleat.com', feed: '/web/feed/' },
      { name: 'zserge', url: 'https://zserge.com', feed: '/rss.xml' },
    ],
    Other: [
      {
        name: "Atlantic '41 (StephanRewind)",
        url: 'https://stephanrewind.itch.io/atlantic-41',
        feed: '/atlantic-41/devlog.rss',
        useFullUrlForImage: true,
      },
      {
        name: 'Annands Anime Stube (German)',
        url: 'https://annandsanimestube.wordpress.com',
        feed: '/feed',
      },
      { name: 'Björn Ottosson', url: 'https://bottosson.github.io', feed: '/feed/feed.xml' },
      { name: 'Sakuga Blog', url: 'https://blog.sakugabooru.com', feed: '/feed' },
      { name: 'Voxelviews', url: 'https://voxelviews.wordpress.com', feed: '/feed' },
    ],
  };

  for (const category in blogs) {
    blogs[category] = await Promise.all(
      blogs[category]
        .sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        })
        .map(async (blog) => {
          const feedUrl = blog.feed && new URL(blog.feed, blog.url).href;
          const latestBlogPost = feedUrl && (await getLatestBlogPost(feedUrl));
          return {
            ...blog,
            icon: blog.imageUrl
              ? await getWebsiteImageHtml(blog.imageUrl)
              : await getWebsiteImage(blog.url, blog.useFullUrlForImage),
            latestBlogPost,
            feedUrl: latestBlogPost ? feedUrl : undefined,
          };
        }),
    );
  }

  return { blogs };
};
