import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import buildlTree from './buildlTree.js';
import format from './formatters/index.js';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const extractFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (fullpath) => parse(fs.readFileSync(fullpath, 'utf-8'), extractFormat(fullpath));

export default (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(buildFullPath(filepath1));
  const data2 = getData(buildFullPath(filepath2));
  const internalTree = buildlTree(data1, data2);
  return format(internalTree, outputFormat);
};
