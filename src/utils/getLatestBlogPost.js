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

/** @param {cheerio.Cheerio<Element>} element */
const getHtmlSaveString = (element) => element.text().replaceAll('<', '&lt;');

const getEntries = (siteTextContent) => {
  const $ = cheerio.load(siteTextContent, { xml: true });
  const atomEntries = $('feed[xmlns="http://www.w3.org/2005/Atom"] entry');
  if (atomEntries.length) {
    return atomEntries.toArray().map((entry) => {
      const title = getHtmlSaveString($(entry).find('title'));
      const link = $(entry).find('link')[0]?.attribs.href;
      const updated = getHtmlSaveString($(entry).find('updated'));
      return { title, link, updated: updated && new Date(updated) };
    });
  }

  const rssEntries = $('rss item');
  if (rssEntries.length) {
    return rssEntries.toArray().map((entry) => {
      const title =
        getHtmlSaveString($(entry).find('title')) ||
        getHtmlSaveString($(entry).find('description'));
      const link = $(entry).find('link').text();
      const updated = getHtmlSaveString($(entry).find('pubDate'));
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
