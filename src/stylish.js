const makeGap = (depth, beginValue = 4) => ' '.repeat(beginValue * depth - 2);

const makeTree = (initialTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    const makeLine = (sign) => `${makeGap(depth)}${sign} ${node.key}: ${node.value}`;
    switch (node.type) {
      case 'added':
        return makeLine('+', node.value);
      case 'removed':
        return makeLine('-', node.value);
      case 'nested':
        return `${makeGap(depth)}${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${makeGap(depth)}}`;
      case 'changed':
        return `${makeLine('-', node.value1)}\n${makeLine('+', node.value2)}`;
      case 'unchanged':
        return makeLine(' ', node.value1);
      default:
        return new Error('This tree is bad. Try another tree');
    }
  });
  return [`{\n${iter(initialTree, 1)}\n}`].join('\n');
};

export default makeTree;
