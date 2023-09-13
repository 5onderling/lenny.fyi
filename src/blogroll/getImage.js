// getting images inspired by https://github.com/11ty/api-indieweb-avatar

const { extname } = require('path');
const EleventyImage = require('@11ty/eleventy-img');
const EleventyFetch = require('@11ty/eleventy-fetch');
const cheerio = require('cheerio');
const icoToPng = require('ico-to-png');

/**
 * @param {string} path
 * @param {string} url
 */
const normalizePath = (path, url) => {
  const fullUrl = new URL(path, url);
  return fullUrl.href;
};

/** @param {string} url */
const getImageUrl = async (url) => {
  try {
    const siteTextContent = await EleventyFetch(url, { type: 'text' });
    const $ = cheerio.load(siteTextContent);

    const appleTouchIcons = $("link[rel~='apple-touch-icon']");
    if (appleTouchIcons.length) {
      return normalizePath(appleTouchIcons[0].attribs.href, url);
    }

    const appleTouchIconsPrecomposedIcons = $("link[rel~='apple-touch-icon-precomposed']");
    if (appleTouchIconsPrecomposedIcons.length) {
      return normalizePath(appleTouchIconsPrecomposedIcons[0].attribs.href, url);
    }

    const relIcon = Array.from($("link[rel~='icon']"))
      .map((icon) => {
        const typeStr = icon.attribs.type;
        let type;
        if (typeStr?.startsWith('image/') || typeStr?.startsWith('img/')) {
          type = typeStr.split('/')[1];
        }
        return {
          href: normalizePath(icon.attribs.href, url),
          size: icon.attribs.sizes?.split('x') || [0, 0],
          type: type || 'auto',
        };
      })
      .sort((a, b) => {
        const ordering = b.size[0] - a.size[0];
        if (!Number.isNaN(ordering)) return ordering;
        if (b.size[0].toLowerCase() === 'any') return 1;
        return -1;
      })[0];
    if (relIcon) {
      if (relIcon.type === 'x-icon' || relIcon.href?.endsWith('.ico')) {
        return relIcon.href;
      }
      return relIcon.href;
    }

    return normalizePath('/favicon.ico', url);
  } catch (_err) {
    console.log(_err);
    return;
  }
};

const getImageHtml = async (urlOrBuffer) => {
  const imageMetadata = await EleventyImage(urlOrBuffer, {
    widths: [40],
    outputDir: './dist/img',
  });
  return EleventyImage.generateHTML(imageMetadata, { alt: '', class: 'page-list__image' });
};

module.exports.getImageHtml = getImageHtml;

/** @param {string} url */
module.exports.getImage = async (url) => {
  try {
    const imageUrl = await getImageUrl(url);

    if (extname(imageUrl) === '.ico') {
      const icoBuffer = await EleventyFetch(imageUrl);
      const buffer = await icoToPng(icoBuffer, 64);
      return await getImageHtml(buffer);
    }

    return await getImageHtml(imageUrl);
  } catch (_err) {
    return '';
  }
};
