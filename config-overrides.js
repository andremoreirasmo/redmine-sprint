/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addBabelPlugin } = require('customize-cra');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-root-import',
    {
      paths: [
        {
          rootPathPrefix: '@/',
          rootPathSuffix: 'src',
        },
      ],
    },
  ]),
);
