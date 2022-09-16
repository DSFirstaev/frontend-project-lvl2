import _ from 'lodash';

const indent = (depth, beginValue = 4) => ' '.repeat(beginValue * depth - 2);

const stringify = (data, depth, nodeTypes) => {
  if (_.isObject(data) === false) {
    return `${data}`;
  }

  const output = Object.entries(data)
    .map(([key, value]) => nodeTypes.unchanged({ key, value }, depth + 1));
  return `{\n${[...output].join('\n')}\n${indent(depth)}  }`;
};

const nodeTypes = {
  added: (node, depth) => `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, nodeTypes)}`,
  removed: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, nodeTypes)}`,
  nested: (node, depth, iter) => `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${indent(depth)}  }`,
  changed: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth, nodeTypes)}\n${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth, nodeTypes)}`,
  unchanged: (node, depth) => `${indent(depth)}  ${node.key}: ${stringify(node.value, depth, nodeTypes)}`,
};

const render = (initialTree) => {
  const iter = (tree, depth) => tree.map((node) => nodeTypes[node.type](node, depth, iter));
  return `{\n${iter(initialTree, 1).join('\n')}\n}`;
};

export default render;
