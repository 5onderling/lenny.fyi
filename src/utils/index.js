import { marked } from 'marked';

/** @type {import('marked').RendererObject} */
const renderer = {
  heading({ text, depth }) {
    if (depth === 1) return `<h1>${text}</h1>`;

    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return html`
      <h${depth} id="${escapedText}">
        <a class="permalink icon icon--clipboard" href="#${escapedText}" aria-label="${text} permalink"></a>
        ${text}
      </h${depth}>
    `;
  },
};

marked.use({ renderer });

/**
 * @param {TemplateStringsArray} strings
 * @param {Array<any>} keys
 * @returns {String}
 */
export const html = (strings, ...keys) => {
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
export const md = (strings, ...keys) => {
  const string = html(strings, ...keys)
    .split('\n')
    .map((s) => s.trim())
    .join('\n');

  return marked.parse(string);
};
