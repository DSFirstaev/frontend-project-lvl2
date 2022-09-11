import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import makeInternalTree from './buildlTree.js';
import format from './formatters/index.js';

const buildFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const extractFormat = (filePath) => path.extname(filePath).slice(1);

const getData = (fullpath) => parse(fs.readFileSync(fullpath, 'utf-8'), extractFormat(fullpath));

export default (filePath1, filePath2, outputFormat = 'stylish') => {
  const dataParse1 = getData(buildFullPath(filePath1));
  const dataParse2 = getData(buildFullPath(filePath2));
  const internalTree = makeInternalTree(dataParse1, dataParse2);
  return format(internalTree, outputFormat);
};
