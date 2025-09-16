# README

## Set up
First time set up will take some time (10+ minutes) because this installs all the h2oai dependencies and the ai model in the docker container

- If you want to skip the ai chatbot, comment out lines 17-26 in the Dockerfile for a significantly faster setup

Run `make build` for first time setup

`make up` to start rails and the ai model, or `make rails` to just start rails

If using make `rails`: navigate to localhost:3000, otherwise navigate to localhost:8080

`make down` to stop the containers

`make rspec` and `make jest` with containers up to run backend and frontend tests

To run the feature tests:
1. `make install-chrome`
2. `make rspec-feature`
