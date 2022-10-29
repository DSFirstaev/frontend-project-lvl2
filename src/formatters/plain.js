import _ from 'lodash';

const stringify = (value) => {
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }

  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return String(value);
};

const getPropertyName = (properties, property) => [...properties, property].join('.');

const nodeTypes = {
  root: ({ children }, path) => {
    const output = children.flatMap((node) => nodeTypes[node.type](node, path));
    return `${output.join('\n')}`;
  },
  added: ({ key, value }, path) => `Property '${getPropertyName(path, key)}' was added with value: ${stringify(value)}`,
  removed: ({ key }, path) => `Property '${getPropertyName(path, key)}' was removed`,
  nested: ({ children, key }, path) => {
    const output = children.flatMap((node) => nodeTypes[node.type](node, [...path, key]));
    return `${output.join('\n')}`;
  },
  changed: ({ key, value1, value2 }, path) => `Property '${getPropertyName(path, key)}' was updated. From ${stringify(value1)} to ${stringify(value2)}`,
  unchanged: () => [],
};

const render = (tree) => {
  const iter = (node, path) => nodeTypes[node.type](node, path);
  return iter(tree, []);
};

export default render;
