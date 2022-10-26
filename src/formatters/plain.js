import _ from 'lodash';

const getComplexValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if ((value === true) || (value === false) || (typeof (value) === 'number')) {
    return String(value);
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return null;
};

const getPropertyName = (properties, property) => [...properties, property].join('.');

const nodeTypes = {
  root: ({ children }, path) => {
    const output = children.flatMap((node) => nodeTypes[node.type](node, path));
    return `${output.join('\n')}`;
  },
  added: (node, path) => `Property '${getPropertyName(path, node.key)}' was added with value: ${getComplexValue(node.value)}`,
  removed: (node, path) => `Property '${getPropertyName(path, node.key)}' was removed`,
  nested: ({ children, key }, path) => {
    const output = children.flatMap((node) => nodeTypes[node.type](node, [...path, key]));
    return `${output.join('\n')}`;
  },
  changed: (node, path) => `Property '${getPropertyName(path, node.key)}' was updated. From ${getComplexValue(node.value1)} to ${getComplexValue(node.value2)}`,
  unchanged: () => [],
};

const render = (tree) => {
  const iter = (node, path) => nodeTypes[node.type](node, path);
  return iter(tree, []);
};

export default render;

// const makePlain = (nodes) => {
//   const iter = (tree, parent) => tree.map((node) => [...parent, node.key].join('.'));
//   return iter(nodes, []);
// };

// const makePlain = (treeOfDifference) => {
//   const iter = (tree, parent) => {
//     const result = tree.map((node) => {
//       const path = [...parent, node.key].join('.');
//     });
//     return _.compact(result).join('\n');
//   };
//   return iter(treeOfDifference, []);
// };
