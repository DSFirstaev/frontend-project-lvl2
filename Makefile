install: 
	npm ci

publish: 
	npm publish --dry-run

lint: 
	npx eslint .  --fix

gendiff:
	npx gendiff -h

rec:
	asciinema rec

text-coverage:
	npm test -- --coverage  --coverageProvider=v8

test:
	node --experimental-vm-modules node_modules/jest/bin/jest.js
