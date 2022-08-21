import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import deepObject from '../__fixtures__/result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, './..', filename);
const filePath1 = './__fixtures__/file1.json';
const filePath2 = './__fixtures__/file2.json';
const filePathYaml1 = './__fixtures__/file1.yaml';
const filePathYaml2 = './__fixtures__/file2.yaml';
const filePathYml1 = './__fixtures__/file1.yml';
const filePathYml2 = './__fixtures__/file2.yml';
const filePathTxt = './__fixtures__/file1.txt';

test('genDiff', () => {
  expect(genDiff(getFixturePath(filePath1), getFixturePath(filePath2))).toBe(deepObject);
});

test('genDiffYaml', () => {
  expect(genDiff(getFixturePath(filePathYaml1), getFixturePath(filePathYaml2))).toBe(deepObject);
});

test('genDiffYml', () => {
  expect(genDiff(getFixturePath(filePathYml1), getFixturePath(filePathYml2))).toBe(deepObject);
});

test('error', () => {
  expect(() => genDiff(getFixturePath(filePathTxt), getFixturePath(filePath2))).toThrow(Error);
});
