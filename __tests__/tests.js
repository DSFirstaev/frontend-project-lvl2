import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import plainObject from '../__fixtures__/result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.resolve(__dirname, './..', filename);
const filePath1 = './__fixtures__/file1.json';
const filePath2 = './__fixtures__/file2.json';

test('genDiff', () => {
  expect(genDiff(getFixturePath(filePath1), getFixturePath(filePath2))).toBe(plainObject);
});
