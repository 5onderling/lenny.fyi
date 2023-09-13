const { marked } = require('marked');

const renderer = {
  heading(text, level) {
    if (level === 1) return `<h1>${text}</h1>`;

    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return html`
      <h${level} id="${escapedText}">
        <a class="permalink icon icon--clipboard" href="#${escapedText}" aria-label="${text} permalink"></a>
        ${text}
      </h${level}>
    `;
  },
};

marked.use({ renderer });

/**
 * @param {TemplateStringsArray} strings
 * @param {Array<any>} keys
 * @returns {String}
 */
const html = (strings, ...keys) => {
  return strings.reduce((res, string, index) => {
    let ret = res + string;
    const keyVal = keys[index];
    if (!keyVal && typeof keyVal !== 'number') return ret;
    if (Array.isArray(keyVal)) return ret + keyVal.join('');

    return ret + keyVal;
  }, '');
};

/**
 * @param {TemplateStringsArray} strings
 * @param {Array<any>} keys
 * @returns {String}
 */
const md = (strings, ...keys) => {
  const string = html(strings, ...keys)
    .split('\n')
    .map((s) => s.trim())
    .join('\n');

  return marked.parse(string);
};

module.exports = { html, md };
