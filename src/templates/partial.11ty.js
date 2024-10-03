import { html } from '../utils/index.js';
import { getTitle } from '../utils/layout.js';

export const render = ({ partial: { data }, content }) => {
  return html`
    <script>
      document.title = ${JSON.stringify(getTitle(data))};
    </script>
    ${content}
  `;
};
