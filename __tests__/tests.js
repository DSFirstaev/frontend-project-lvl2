import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, '../__fixtures__/', filename);
const filePathResultStylish = 'stylishResult.txt';
const filePathResultPlain = 'plainResult.txt';
const filePathResultJSON = 'jsonResult.txt';
const stylishFormatResult = readFileSync(getFixturePath(filePathResultStylish), 'utf-8');
const plainFormatResult = readFileSync(getFixturePath(filePathResultPlain), 'utf-8');
const jsonFormatResult = readFileSync(getFixturePath(filePathResultJSON), 'utf-8');

describe('format JSON', () => {
  test('genDiffJSON', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(stylishFormatResult);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(stylishFormatResult);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(plainFormatResult);
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(jsonFormatResult);
    expect(() => genDiff(getFixturePath('file1.txt'), getFixturePath('file2.json'))).toThrow(Error);
    expect(() => JSON.parse(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))).toBeTruthy();
  });
});

describe('format Yaml', () => {
  test('genDiffYaml', () => {
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toBe(stylishFormatResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toBe(plainFormatResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toBe(stylishFormatResult);
    expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toBe(jsonFormatResult);
    expect(() => genDiff(getFixturePath('file1.txt'), getFixturePath('file2.yaml'))).toThrow(Error);
    expect(() => JSON.parse(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml')))).toBeTruthy();
  });
});

describe('format Yml', () => {
  test('genDiffYml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(stylishFormatResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toBe(stylishFormatResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toBe(plainFormatResult);
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toBe(jsonFormatResult);
    expect(() => genDiff(getFixturePath('file1.txt'), getFixturePath('file2.yml'))).toThrow(Error);
    expect(() => JSON.parse(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')))).toBeTruthy();
  });
});
