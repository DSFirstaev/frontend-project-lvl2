import _ from 'lodash';

const getComplexValue = (value) => {
  if (_.isPlainObject(value) === true) {
    return '[complex value]';
  }
  if ((value === true) || (value === false) || (typeof (value) === 'number')) {
    return `${value}`;
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return null;
};

const makePlain = (treeOfDifference) => {
  const iter = (tree, parent) => {
    const result = tree.map((node) => {
      const path = [...parent, node.key].join('.');
      switch (node.type) {
        case 'added':
          return `Property '${path}' was added with value: ${getComplexValue(node.value)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'nested':
          return `${iter(node.children, [path])}`;
        case 'changed':
          return `Property '${path}' was updated. From ${getComplexValue(node.value1)} to ${getComplexValue(node.value2)}`;
        case 'unchanged':
          return null;
        default:
          return new Error('This tree is bad. Try another tree');
      }
    });
    return _.compact(result).join('\n');
  };
  return iter(treeOfDifference, []);
};

export default makePlain;
