const { marked } = require('marked');

const renderer = {
  heading(text, level) {
    if (level === 1) return `<h1>${text}</h1>`;

    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return html`
      <h${level}>
        <a class="permalink" href="#${escapedText}" aria-label="${text} permalink">
          <svg class="permalink__icon" viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 010-7.07l3.54-3.54a5.003 5.003 0 017.07 0 5.003 5.003 0 010 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 000-4.24 2.982 2.982 0 00-4.24 0l-3.53 3.53a2.982 2.982 0 000 4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 010 7.07l-3.54 3.54a5.003 5.003 0 01-7.07 0 5.003 5.003 0 010-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 000 4.24 2.982 2.982 0 004.24 0l3.53-3.53a2.982 2.982 0 000-4.24.973.973 0 010-1.42z"/></svg>
        </a>
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
