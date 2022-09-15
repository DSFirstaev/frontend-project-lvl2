import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);
const stylishFormatResult = readFileSync(getPath('stylishResult.txt'), 'utf-8');
const plainFormatResult = readFileSync(getPath('plainResult.txt'), 'utf-8');
const jsonFormatResult = readFileSync(getPath('jsonResult.txt'), 'utf-8');

describe('genDiff', () => {
  test.each([
    ['json', 'json'],
    ['yaml', 'yaml'],
    ['yml', 'yml'],
  ])('genDiff(%s, %s)', (format) => {
    const filepath1 = getPath(`file1.${format}`);
    const filepath2 = getPath(`file2.${format}`);
    expect(genDiff(getPath(filepath1), getPath(filepath2), 'stylish')).toBe(stylishFormatResult);
    expect(genDiff(getPath(filepath1), getPath(filepath2), 'plain')).toBe(plainFormatResult);
    expect(genDiff(getPath(filepath1), getPath(filepath2), 'json')).toBe(jsonFormatResult);
    expect(genDiff(getPath(filepath1), getPath(filepath2))).toBe(stylishFormatResult);
    expect(() => JSON.parse(genDiff(getPath(filepath1), getPath(filepath2)))).toBeTruthy();
  });
});
