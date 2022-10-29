import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);

const stringify = (data, depth, nodeTypes) => {
  if (!_.isObject(data)) {
    return String(data);
  }

  const output = Object.entries(data)
    .map(([key, value]) => nodeTypes.unchanged({ key, value }, depth + 1));
  return `{\n${output.join('\n')}\n${indent(depth)}  }`;
};

const nodeTypes = {
  root: ({ children }, depth) => {
    const output = children.map((node) => nodeTypes[node.type](node, depth + 1));
    return `{\n${output.join('\n')}\n}`;
  },
  added: ({ key, value }, depth) => `${indent(depth)}+ ${key}: ${stringify(value, depth, nodeTypes)}`,
  removed: ({ key, value }, depth) => `${indent(depth)}- ${key}: ${stringify(value, depth, nodeTypes)}`,
  nested: ({ key, children }, depth) => {
    const output = children.map((node) => nodeTypes[node.type](node, depth + 1));
    return `${indent(depth)}  ${key}: {\n${output.join('\n')}\n${indent(depth)}  }`;
  },
  changed: ({ key, value1, value2 }, depth) => {
    const output1 = `${indent(depth)}- ${key}: ${stringify(value1, depth, nodeTypes)}`;
    const output2 = `${indent(depth)}+ ${key}: ${stringify(value2, depth, nodeTypes)}`;
    return `${output1}\n${output2}`;
  },
  unchanged: ({ key, value }, depth) => `${indent(depth)}  ${key}: ${stringify(value, depth, nodeTypes)}`,
};

const render = (tree) => {
  const iter = (node, depth) => nodeTypes[node.type](node, depth);
  return iter(tree, 0);
};

export default render;
