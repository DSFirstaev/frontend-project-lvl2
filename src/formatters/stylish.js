import _ from 'lodash';

const indent = (depth, beginValue = 4) => ' '.repeat(beginValue * depth - 2);

const stringify = (data, depth) => {
  if (_.isPlainObject(data) === false) {
    return `${data}`;
  }

  const output = Object.entries(data)
    .map(([key, value]) => nodeTypes.unchanged(depth + 1, key, value));
  return ['{', ...output, `${indent(depth)}  }`].join('\n');
};

const output1 = (depth, key, value) => `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
const output2 = (depth, key, value) => `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;

const addedLine = (depth, key, value) => `${indent(depth)}+ ${key}: ${stringify(value, depth)}`;
const removedLine = (depth, key, value) => `${indent(depth)}- ${key}: ${stringify(value, depth)}`;
const nestedLine = (depth, key, children) => `${indent(depth)}  ${key}: {\n${iter(children, depth + 1).join('\n')}\n${indent(depth)}  }`;
const changedLine = () => `${output1}\n${output2}`;
const unchangedLine = (depth, key, value) => `${indent(depth)}  ${key}: ${stringify(value, depth)}`;

const nodeTypes = {
  added: addedLine,
  removed: removedLine,
  nested: nestedLine,
  changed: changedLine,
  unchanged: unchangedLine,
};

const render = (initialTree) => {
  const iter = (tree, type, depth) => tree.map((node) => {
    return (depth) => nodeTypes[type](depth, node.key, node.value);
  });
  return `{\n${iter(initialTree, 1).join('\n')}\n}`;
};

export default render;
// const render = (initialTree, ) => {
//   const iter = (tree, depth) => tree.map((node) => {
//     const output1 = `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
//     const output2 = `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
//     switch (node.type) {
//       case 'added':
//         return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
//       case 'removed':
//         return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
//       case 'nested':
//         return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${indent(depth)}  }`;
//       case 'changed':
//         return `${output1}\n${output2}`;
//       case 'unchanged':
//         return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
//       default:
//         return new Error('This tree is bad. Try another tree');
//     }
//   });
//   return `{\n${iter(initialTree, 1).join('\n')}\n}`;
// };

// export default render;

// const render = (initialTree) => {
//   const iter = (tree, depth) => tree.map((node) => {
//     const output1 = `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
//     const output2 = `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
//     return (tree, depth) => nodeType[type](tree, depth);
//   });
//   return `{\n${iter(initialTree, 1).join('\n')}\n}`;
// };

// const stringify = (data, depth) => {
//   if (_.isPlainObject(data) === false) {
//     return `${data}`;
//   }

//   const output = Object.entries(data)
//     .map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
//   return ['{', ...output, `${indent(depth)}  }`].join('\n');
// };

