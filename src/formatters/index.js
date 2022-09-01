import formatTree from './stylish.js';
import formatPlain from './plain.js';

const format = (type, treeOfDifference) => {
  switch (type) {
    case 'stylish':
      return formatTree(treeOfDifference);
    case 'plain':
      return formatPlain(treeOfDifference);
    default:
      return `${type} is not right format. Use 'stylish' or 'plain'`;
  }
};

export default format;
