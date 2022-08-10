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