import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);

const stringify = (data, depth, nodeTypes) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([key, value]) => nodeTypes.unchanged({ key, value }, depth + 1));
  return `{\n${[...output].join('\n')}\n${indent(depth)}  }`;
};

const nodeTypes = {
  root: ({ children }, depth) => {
    const output = children.map((node) => nodeTypes[node.type](node, depth + 1));
    return `{\n${output.join('\n')}\n}`;
  },
  added: (node, depth) => `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth, nodeTypes)}`,
  removed: (node, depth) => `${indent(depth)}- ${node.key}: ${stringify(node.value, depth, nodeTypes)}`,
  nested: ({ key, children }, depth) => {
    const output = children.map((node) => nodeTypes[node.type](node, depth + 1));
    return `${indent(depth)}  ${key}: {\n${output.join('\n')}\n${indent(depth)}  }`;
  },
  changed: (node, depth) => {
    const output1 = `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth, nodeTypes)}`;
    const output2 = `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth, nodeTypes)}`;
    return `${output1}\n${output2}`;
  },
  unchanged: (node, depth) => `${indent(depth)}  ${node.key}: ${stringify(node.value, depth, nodeTypes)}`,
};

const render = (tree) => {
  const iter = (node, depth) => nodeTypes[node.type](node, depth);
  return iter(tree, 0);
};

export default render;
