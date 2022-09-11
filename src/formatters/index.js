import formatTree from './stylish.js';
import formatPlain from './plain.js';

// const format = (tree, type) => {
//   switch (type) {
//     case 'stylish':
//       return formatTree(tree);
//     case 'plain':
//       return formatPlain(tree);
//     case 'json':
//       return JSON.stringify(tree);
//     default:
//       return `${type} is not right format. Use 'stylish' or 'plain'`;
//   }
// };

const formats = {
  stylish: formatTree,
  plain: formatPlain,
  json: JSON.stringify,
};

const format = (tree, type) => formats[type](tree);

export default format;
