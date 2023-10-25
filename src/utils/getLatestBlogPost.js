const EleventyFetch = require('@11ty/eleventy-fetch');
const cheerio = require('cheerio');
const { fetchOptions } = require('../shared/fetchOptions.js');

exports.getLatestBlogPost = async (url, feed) => {
  try {
    const siteTextContent = await EleventyFetch(new URL(feed, url).href, {
      type: 'text',
      fetchOptions,
    });
    const $ = cheerio.load(siteTextContent);
    const lol = $('feed[xmlns="http://www.w3.org/2005/Atom"] entry:first-of-type');
    if (lol.length) {
      const title = lol.find('title').text();
      const link = lol.find('link')[0]?.attribs.href;
      const updated = lol.find('updated').text();
      if (title && link)
        return {
          title,
          link,
          updated:
            updated &&
            new Date(updated).toLocaleDateString('en', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
        };
    }
  } catch (_err) {
    console.log(_err);
  }
};
