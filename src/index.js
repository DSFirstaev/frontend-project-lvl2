import { readFile, defineFileType, buildFullPath } from './utils.js';
import parseFile from './parser.js';
import makeASTTree from './buildASTTree.js';
import makeTree from './stylish.js';

export default (filepath1, filepath2) => {
  const fileType1 = defineFileType(filepath1);
  const fileType2 = defineFileType(filepath2);
  const dataParse1 = parseFile(fileType1, readFile(buildFullPath(filepath1)));
  const dataParse2 = parseFile(fileType2, readFile(buildFullPath(filepath2)));
  const ASTTree = makeASTTree(dataParse1, dataParse2);
  return makeTree(ASTTree);
};
