install: 
	npm ci

publish: 
	npm publish --dry-run

lint: 
	npx eslint .

gendiff:
	npx gendiff -h