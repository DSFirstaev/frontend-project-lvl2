import _ from 'lodash';

const makeIndent = (depth, beginValue = 4) => ' '.repeat(beginValue * depth - 2);

const stringify = (data, depth) => {
  if (_.isPlainObject(data) === false) {
    return `${data}`;
  }

  const values = Object.entries(data)
    .map(([key, value]) => `${makeIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...values, `${makeIndent(depth)}  }`].join('\n');
};

const makeLine = (depth, sign, key, value) => `${makeIndent(depth)}${sign} ${key}: ${stringify(value, depth)}`;

const makeTree = (initialTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    switch (node.type) {
      case 'added':
        return makeLine(depth, '+', node.key, node.value);
      case 'removed':
        return makeLine(depth, '-', node.key, node.value);
      case 'nested':
        return `${makeIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${makeIndent(depth)}  }`;
      case 'changed':
        return `${makeLine(depth, '-', node.key, node.value1)}\n${makeLine(depth, '+', node.key, node.value2)}`;
      case 'unchanged':
        return makeLine(depth, ' ', node.key, node.value);
      default:
        return new Error('This tree is bad. Try another tree');
    }
  });
  return `{\n${iter(initialTree, 1).join('\n')}\n}`;
};

export default makeTree;