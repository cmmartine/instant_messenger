# README

## First time set up
First time set up will take some time because this installs all the h2oai dependencies and the ai model.

Run the following:
`docker compose build`
`docker compose run --rm rails bin/rails db:create`
`docker compose run --rm rails bin/rails db:migrate`
`docker compose run --rm rails bin/rails db:seed`

`docker compose up` can now be used when starting the application and previous steps do not need to be run every time.
