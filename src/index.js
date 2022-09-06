import path from 'path';
import fs from 'fs';
import parse from './parser.js';
import makeInternalTree from './makeInternalTree.js';
import format from './formatters/index.js';

const buildFullPath = (filePath) => path.resolve(process.cwd(), filePath);

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const extractFormat = (filePath) => {
  const fileType = path.extname(filePath).slice(1);
  return fileType;
};

const getData = (file) => parse(extractFormat(file), readFile(buildFullPath(file)));

export default (file1, file2, type = 'stylish') => {
  const dataParse1 = getData(file1);
  const dataParse2 = getData(file2);
  const internalTree = makeInternalTree(dataParse1, dataParse2);
  return format(type, indternalTree);
};
