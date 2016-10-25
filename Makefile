ESLINT=./node_modules/.bin/eslint
NODE=node

test:
	@make lint

lint:
	$(ESLINT) . --ext .js
