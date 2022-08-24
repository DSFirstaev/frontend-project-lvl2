import path from 'path';
import fs from 'fs';

export const buildFullPath = (filePath) => path.resolve(process.cwd(), filePath);

export const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

export const defineFileType = (filePath) => {
  const fileType = path.extname(filePath).slice(1);
  return fileType;
};
