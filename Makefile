install: 
	npm ci

publish: 
	npm publish --dry-run

lint: 
	npx eslint .  --fix

gendiff:
	npx gendiff __fixtures__/file1.yaml __fixtures__/file2.yaml

rec:
	asciinema rec

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npm test
