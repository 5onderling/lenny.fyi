import EleventyFetch from '@11ty/eleventy-fetch';
import * as cheerio from 'cheerio';
import { fetchOptions } from '../shared/fetchOptions.js';

const getFormattedDate = (date) => {
  if (!date) return;
  return date.toLocaleDateString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getEntries = (siteTextContent) => {
  const $ = cheerio.load(siteTextContent, { xml: true });
  const atomEntries = $('feed[xmlns="http://www.w3.org/2005/Atom"] entry');
  if (atomEntries.length) {
    return atomEntries.toArray().map((entry) => {
      const title = $(entry).find('title').text();
      const link = $(entry).find('link')[0]?.attribs.href;
      const updated = $(entry).find('updated').text();
      return { title, link, updated: updated && new Date(updated) };
    });
  }

  const rssEntries = $('rss item');
  if (rssEntries.length) {
    return rssEntries.toArray().map((entry) => {
      const title = $(entry).find('title').text();
      const link = $(entry).find('link').text();
      const updated = $(entry).find('pubDate').text();
      return { title, link, updated: updated && new Date(updated) };
    });
  }
};

export const getLatestBlogPost = async (feedUrl) => {
  try {
    const siteTextContent = await EleventyFetch(feedUrl, { type: 'text', fetchOptions });
    const entries = getEntries(siteTextContent);
    // https://pawelgrzybek.com/feed.xml contains Archive with same latest updated as latest real post
    const filteredEntries = entries.filter((entry) => entry.title !== 'Archive');
    const sortedEntries = filteredEntries.sort((a, b) => b.updated - a.updated);
    return { ...sortedEntries[0], updated: getFormattedDate(sortedEntries[0].updated) };
  } catch (_err) {
    console.log(_err);
  }
};
