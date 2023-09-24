const { md } = require('./utils/index.js');

exports.data = {
  title: '404',
  permalink: '404.html',
};

exports.render = () => md`
  # 404 not found

  The page that you found does not exist, or got deleted since the last time, maybe you'll find something on the [homepage](/).
`;
