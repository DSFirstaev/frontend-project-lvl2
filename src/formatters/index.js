import formatTree from './stylish.js';
import formatPlain from './plain.js';

const formats = {
  stylish: formatTree,
  plain: formatPlain,
  json: JSON.stringify,
};

const format = (tree, type) => formats[type](tree);

export default format;
