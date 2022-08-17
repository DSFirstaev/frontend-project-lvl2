import _ from 'lodash';
import { readFile, defineFileType, buildFullPath } from './utils.js';
import parseFile from './parser.js';

const makeLine = (sign, key, value) => `  ${sign} ${key}: ${value}`;

export default (filepath1, filepath2) => {
  const fileType1 = defineFileType(filepath1);
  const fileType2 = defineFileType(filepath2);
  const dataParse1 = parseFile(fileType1, readFile(buildFullPath(filepath1)));
  const dataParse2 = parseFile(fileType2, readFile(buildFullPath(filepath2)));
  const keys1 = _.keys(dataParse1);
  const keys2 = _.keys(dataParse2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    if (!_.has(dataParse1, key)) {
      return makeLine('+', key, dataParse2[key]);
    }
    if (!_.has(dataParse2, key)) {
      return makeLine('-', key, dataParse1[key]);
    }
    if (!_.isEqual(dataParse1[key], dataParse2[key])) {
      return `${makeLine('-', key, dataParse1[key])}\n${makeLine('+', key, dataParse2[key])}`;
    }
    return `${makeLine(' ', key, dataParse1[key])}`;
  });

  return `{\n${result.join('\n')}\n}`;
};
