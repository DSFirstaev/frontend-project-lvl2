import _ from 'lodash';

export const buildASTTree = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  const ASTTree = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { type: 'nested', key, children: buildASTTree(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: 'changed', key, value1: data1[key], value2: data2[key],
      };
    }
    return { type: 'unchanged', key, value: data1[key] };
  });
  return ASTTree;
};

export default buildASTTree;
