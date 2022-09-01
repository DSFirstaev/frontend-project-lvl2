import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

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
const filePathResultTree = './__fixtures__/treeResult.txt';
const filePathResultPlain = './__fixtures__/plainResult.txt';
const treeFormat = readFileSync(getFixturePath(filePathResultTree), 'utf-8');
const plainFormat = readFileSync(getFixturePath(filePathResultPlain), 'utf-8');

test('genDiffTreeJson', () => {
  expect(genDiff(getFixturePath(filePath1), getFixturePath(filePath2))).toBe(treeFormat);
});

test('genDiffTreeYaml', () => {
  expect(genDiff(getFixturePath(filePathYaml1), getFixturePath(filePathYaml2))).toBe(treeFormat);
});

test('genDiffTreeYml', () => {
  expect(genDiff(getFixturePath(filePathYml1), getFixturePath(filePathYml2))).toBe(treeFormat);
});

test('genDiffPlainJson', () => {
  expect(genDiff(getFixturePath(filePath1), getFixturePath(filePath2), 'plain')).toBe(plainFormat);
});

test('genDiffPlainYaml', () => {
  expect(genDiff(getFixturePath(filePathYaml1), getFixturePath(filePathYaml2), 'plain')).toBe(plainFormat);
});

test('genDiffPlainYml', () => {
  expect(genDiff(getFixturePath(filePathYml1), getFixturePath(filePathYml2), 'plain')).toBe(plainFormat);
});

test('error', () => {
  expect(() => genDiff(getFixturePath(filePathTxt), getFixturePath(filePath2))).toThrow(Error);
});
