const { html } = require('../utils');
const { getTitle } = require('../utils/layout.js');

exports.render = ({ partial: { data } }) => html`
  <script>
    document.title = ${JSON.stringify(getTitle(data))};
  </script>
  ${data.content}
`;
