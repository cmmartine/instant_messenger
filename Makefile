# https://stackoverflow.com/a/14061796/2237879
#
# Allows you to run make commands with any set of arguments
#
# For example, these lines are the same:
#   > make one-rspec spec/path/here.rb
RUN_ARGS := $(wordlist 2, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS))

up: #starts the docker containers
	docker compose up -d

down: #stops the docker containers
	docker compose down

rails: #run rails server without h2oai
	docker compose run -p 3000:3000 --rm rails rails s -b '0.0.0.0'

rspec: #run rails rspec tests
	docker compose exec rails rspec

one-rspec: #run passed in rspec
	docker compose exec rails rspec $(RUN_ARGS)

jest: #run frontend jest tests
	npm test

one-jest: #run passed in jest test
	npm test $(RUN_ARGS)

rails-c: #launches containers rails console
	docker compose exec rails bin/rails c

build: #first time dev setup
	docker compose build
	docker compose run --rm rails bin/rails db:create
	docker compose run --rm rails bin/rails db:migrate
	docker compose run --rm rails bin/rails db:seed

db-reset: #reset and reseed the database
	docker compose exec rails bin/rails db:reset

db-migrate: 
	docker compose exec rails bin/rails db:migrate