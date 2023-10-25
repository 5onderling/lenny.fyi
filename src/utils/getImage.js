// getting images inspired by https://github.com/11ty/api-indieweb-avatar

const { extname } = require('path');
const EleventyImage = require('@11ty/eleventy-img');
const EleventyFetch = require('@11ty/eleventy-fetch');
const cheerio = require('cheerio');
const icoToPng = require('ico-to-png');
const { fetchOptions } = require('../shared/fetchOptions.js');

/**
 * @param {string} path
 * @param {string} url
 */
const normalizePath = (path, url) => {
  if (path.startsWith('http') || path.startsWith('data:')) return path;

  if (!path.startsWith('/')) {
    path = new URL(url).pathname + '/' + path;
  }
  const fullUrl = new URL(path, url);
  return fullUrl.href;
};

/** @param {string} url */
const getImageUrl = async (url) => {
  try {
    const siteTextContent = await EleventyFetch(url, { type: 'text', fetchOptions });
    const $ = cheerio.load(siteTextContent);

    if (url.includes('.medium.com')) {
      const twitterImage = $("meta[name~='twitter:image:src']");
      if (twitterImage.length) {
        return normalizePath(twitterImage[0].attribs.content, url);
      }
    }

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

const getImageHtml = async (
  urlOrBuffer,
  { width = 'auto', alt = '', class: css = '', lazy = true } = {},
) => {
  const imageMetadata = await EleventyImage(urlOrBuffer, {
    widths: [width],
    outputDir: './dist/img',
    formats: ['avif', 'webp', 'jpeg', 'svg'],
    cacheOptions: { fetchOptions },
  });
  return EleventyImage.generateHTML(imageMetadata, {
    alt,
    class: css,
    ...(lazy && { loading: 'lazy' }),
  });
};
module.exports.getImageHtml = getImageHtml;

const websiteImageClass = 'page-list__image';
const getWebsiteImageHtml = (urlOrBuffer) => {
  return getImageHtml(urlOrBuffer, { width: 40, class: websiteImageClass });
};
module.exports.getWebsiteImageHtml = getWebsiteImageHtml;

/** @param {string} url */
module.exports.getWebsiteImage = async (url, useFullUrl) => {
  try {
    const imageUrl = await getImageUrl(useFullUrl ? url : new URL(url).origin);

    if (imageUrl.startsWith('data:')) {
      const icoBuffer = Buffer.from(await fetch(imageUrl).then((res) => res.arrayBuffer()));
      return await getWebsiteImageHtml(icoBuffer);
    }

    if (extname(imageUrl) === '.ico') {
      const icoBuffer = await EleventyFetch(imageUrl);
      const buffer = await icoToPng(icoBuffer, 64);
      return await getWebsiteImageHtml(buffer);
    }

    return await getWebsiteImageHtml(imageUrl);
  } catch (_err) {
    return `<div class="${websiteImageClass} icon icon--website"></div>`;
  }
};
